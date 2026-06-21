// Flytrap DS — AI Chat Edge Function
// RAG sobre ds_context + proxy Anthropic (key server-side). Deno runtime.
import { createClient } from "jsr:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const ANTHROPIC_KEY = Deno.env.get("ANTHROPIC_API_KEY")!;
const VOYAGE_KEY = Deno.env.get("VOYAGE_API_KEY")!;

const ALLOW_ORIGIN = "https://flytrapds.vercel.app";
const cors = {
  "Access-Control-Allow-Origin": ALLOW_ORIGIN,
  "Access-Control-Allow-Headers": "authorization, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

async function embed(text: string): Promise<number[]> {
  const r = await fetch("https://api.voyageai.com/v1/embeddings", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${VOYAGE_KEY}` },
    body: JSON.stringify({ model: "voyage-3", input: text, output_dimension: 1024 }),
  });
  const j = await r.json();
  return j.data[0].embedding;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const { message } = await req.json();
    if (!message) return json({ error: "message required" }, 400);

    const sb = createClient(SUPABASE_URL, SERVICE_ROLE);

    // 1. RAG
    const qEmb = await embed(message);
    const { data: ctx, error } = await sb.rpc("match_ds_context", {
      query_embedding: qEmb, match_count: 5,
    });
    if (error) throw error;
    const context = (ctx ?? []).map((c: any) => `[${c.source}] ${c.chunk}`).join("\n\n");

    // 2. Anthropic (key server-side)
    const ar = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ANTHROPIC_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1024,
        system: `Você é o assistente do Flytrap Design System. Responda só com base no contexto do DS.\n\nContexto:\n${context}`,
        messages: [{ role: "user", content: message }],
      }),
    });
    const aj = await ar.json();
    const text = (aj.content ?? []).filter((b: any) => b.type === "text").map((b: any) => b.text).join("");
    return json({ answer: text, sources: (ctx ?? []).map((c: any) => c.source) });
  } catch (e) {
    return json({ error: String(e) }, 500);
  }
});

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status, headers: { ...cors, "Content-Type": "application/json" },
  });
}

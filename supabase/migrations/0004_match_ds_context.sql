-- RPC de similaridade p/ RAG (executada com service_role via Edge)
create or replace function public.match_ds_context(
  query_embedding extensions.vector(1024),
  match_count int default 5
) returns table (id bigint, source text, chunk text, similarity float)
language sql stable as $$
  select c.id, c.source, c.chunk,
         1 - (c.embedding <=> query_embedding) as similarity
  from public.ds_context c
  order by c.embedding <=> query_embedding
  limit match_count;
$$;

import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../src/ai/chat/ft-chat-thread.js";
import "../src/ai/chat/ft-message-bubble.js";
import "../src/ai/chat/ft-prompt-input.js";
import "../src/ai/chat/ft-citation-chip.js";

const meta: Meta = {
  title: "AI/Chat",
  component: "ft-chat-thread",
};

export default meta;

export const Thread: StoryObj = {
  render: () => html`
    <div style="height:480px;width:400px;border:1px solid var(--border,#E0D4D6);border-radius:0.625rem;overflow:hidden">
      <ft-chat-thread>
        <ft-message-bubble role="user" timestamp="10:30 AM">
          What are the APCA contrast requirements for body text?
        </ft-message-bubble>
        <ft-message-bubble role="assistant" timestamp="10:30 AM">
          Body text requires an APCA Lc value of at least 75.
          <ft-citation-chip .index=${1} label="APCA docs" href="#"></ft-citation-chip>
        </ft-message-bubble>
        <ft-message-bubble role="user" timestamp="10:31 AM">
          And for UI elements?
        </ft-message-bubble>
        <ft-message-bubble role="assistant" streaming>
          UI elements need an APCA Lc of at least 60...
        </ft-message-bubble>
        <ft-prompt-input
          slot="input"
          placeholder="Ask about Flytrap DS..."
          .suggestions=${["Show color scale", "Explain token layers", "List AI components"]}
        ></ft-prompt-input>
      </ft-chat-thread>
    </div>
  `,
};

import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../src/components/ft-card.js";
import "../src/components/ft-button.js";

const meta: Meta = {
  title: "Base/Card",
  component: "ft-card",
  argTypes: {
    elevated: { control: "boolean" },
    interactive: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => html`
    <ft-card ?elevated=${args.elevated} ?interactive=${args.interactive} style="max-width:360px">
      <span slot="title">Card Title</span>
      <span slot="description">Card description goes here.</span>
      <p>This is the content of the card. Web Components are awesome!</p>
      <div slot="footer">
        <ft-button size="sm">Action</ft-button>
      </div>
    </ft-card>
  `,
};

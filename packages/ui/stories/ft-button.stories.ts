import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";
import "../src/components/ft-button.js";

const meta: Meta = {
  title: "Base/Button",
  component: "ft-button",
  argTypes: {
    variant: { control: "select", options: ["default", "outline", "secondary", "destructive", "ghost", "link"] },
    size: { control: "select", options: ["sm", "md", "lg", "icon"] },
    disabled: { control: "boolean" },
    full: { control: "boolean" },
  },
};

export default meta;

export const Default: StoryObj = {
  render: (args) => html`
    <ft-button variant=${args.variant || "default"} size=${args.size || "md"} ?disabled=${args.disabled} ?full=${args.full}>
      Click me
    </ft-button>
  `,
};

export const AllVariants: StoryObj = {
  render: () => html`
    <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">
      <ft-button variant="default">Default</ft-button>
      <ft-button variant="outline">Outline</ft-button>
      <ft-button variant="secondary">Secondary</ft-button>
      <ft-button variant="destructive">Destructive</ft-button>
      <ft-button variant="ghost">Ghost</ft-button>
      <ft-button variant="link">Link</ft-button>
    </div>
  `,
};

export const Sizes: StoryObj = {
  render: () => html`
    <div style="display:flex;gap:8px;align-items:center">
      <ft-button size="sm">Small</ft-button>
      <ft-button size="md">Medium</ft-button>
      <ft-button size="lg">Large</ft-button>
    </div>
  `,
};

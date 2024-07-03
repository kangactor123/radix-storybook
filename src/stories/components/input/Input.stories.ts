import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta = {
  title: "UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: "small",
    placeholder: "small size",
  },
};

export const Medium: Story = {
  args: {
    placeholder: "default",
  },
};

export const Disable: Story = {
  args: {
    placeholder: "disable",
    disabled: true,
  },
};

export const Large: Story = {
  args: {
    size: "large",
    placeholder: "large size",
  },
};

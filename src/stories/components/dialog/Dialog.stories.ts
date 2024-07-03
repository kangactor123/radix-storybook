import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from "./Dialog";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Dialog",
  component: Dialog,
  //   parameters: {
  //     layout: "centered",
  //   },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicDialog: Story = {
  args: {
    title: "title",
    children: "content",
  },
};

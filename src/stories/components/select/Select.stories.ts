import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    selectRootProps: {
      value: "this",
      onValueChange: (value) => {
        console.log(value);
      },
    },
    selectContentProps: {
      position: "popper",
      sideOffset: 5,
    },
    selectItems: [
      { textValue: "title", value: "title", label: "title" },
      { textValue: "first", value: "first", disabled: true },
      { textValue: "second", value: "second" },
      { textValue: "third", value: "third", hasSeparator: true },
    ],
  },
};

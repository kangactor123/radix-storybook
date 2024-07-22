import type { Meta, StoryObj } from "@storybook/react";
import { Select } from ".";
import { useState } from "react";

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
      { label: "title", value: "title", title: "title" },
      {
        label: (
          <div style={{ width: 300, height: 80, padding: 12 }}>
            <h1>this is first</h1>
          </div>
        ),
        value: "first",
        disabled: true,
      },
      { label: "second", value: "second" },
      { label: "third", value: "third" },
    ],
  },
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Select
        {...args}
        selectRootProps={{ value, onValueChange: (value) => setValue(value) }}
      />
    );
  },
};

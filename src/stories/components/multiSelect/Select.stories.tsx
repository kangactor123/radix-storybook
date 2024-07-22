import type { Meta, StoryObj } from "@storybook/react";
import { MultiSelect } from ".";
import { useState } from "react";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "UI/MultiSelect",
  component: MultiSelect,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    placeholder: "placeholder",
    selectRootProps: {
      values: ["this"],
      onChangeValues: (value) => {
        console.log(value);
      },
    },
    selectContentProps: {
      position: "popper",
      sideOffset: 5,
    },
    selectItems: [
      { label: "title", value: "title", title: "title" },
      // {
      //   label: (
      //     <div style={{ width: 300, height: 80, padding: 12 }}>
      //       <h1>this is first</h1>
      //     </div>
      //   ),
      //   value: "first",
      //   disabled: true,
      // },
      { label: "second", value: "second" },
      { label: "third", value: "third" },
    ],
  },
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);
    return (
      <MultiSelect
        {...args}
        selectRootProps={{
          values,
          onChangeValues: (value) => setValues(value),
        }}
      />
    );
  },
};

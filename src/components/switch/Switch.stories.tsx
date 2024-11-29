import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from ".";

const meta = {
  title: "UI/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  render: (args) => {
    const onCheckedChange = (checked: boolean) => {
      console.log(checked);
    };
    return <Switch {...args} switchProps={{ onCheckedChange }} />;
  },
};

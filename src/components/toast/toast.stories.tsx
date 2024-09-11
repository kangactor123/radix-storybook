import type { Meta, StoryObj } from "@storybook/react";
import { Toast } from ".";
import { useState } from "react";

const meta = {
  title: "UI/Toast",
  component: Toast,
} satisfies Meta<typeof Toast>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    open: false,
    title: "제목입니다.",
    description:
      "요청하신 무엇인가를 삭제했습니다. 다시 재접속해주세요.ㅎㅎㅎㅎ",
    onOpenChange: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    return (
      <div>
        <button onClick={handleClickOpen}>click</button>
        <Toast {...args} open={open} onOpenChange={(open) => setOpen(open)} />
      </div>
    );
  },
};

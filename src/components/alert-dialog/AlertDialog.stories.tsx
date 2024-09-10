import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import AlertDialog from ".";

const meta = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
  decorators: [
    (story) => (
      <div
        style={{
          width: "600px",
          height: "400px",
        }}
      >
        {story()}
      </div>
    ),
  ],
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicAlertDialog: Story = {
  args: {
    title: "기본 팝업입니다.",
    children: "확인 해주시겠나요?",
    closeButtonLabel: "닫기",
    open: false,
    onClickClose: () => {},
  },
  render: (args) => {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
      setOpen(false);
    };
    return (
      <>
        <button onClick={() => setOpen(true)}>Click Close</button>
        <AlertDialog {...args} open={open} onClickClose={handleClose} />
      </>
    );
  },
};

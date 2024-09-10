import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { AlertDialog } from ".";
import { AlertDialogProvider } from "../../provider/alert-dialog.provider";
import { useAlertDialog } from "../../hooks/useAlertDialog";

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

export const Basic: Story = {
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
    const onOpenChange = (open: boolean) => {
      if (!open) {
        alert("닫혀짐");
      }
    };
    return (
      <>
        <button onClick={() => setOpen(true)}>Click Here!</button>
        <AlertDialog
          {...args}
          open={open}
          onClickClose={handleClose}
          onOpenChange={onOpenChange}
        />
      </>
    );
  },
};

const UseAlertDialogComponent = () => {
  const { open } = useAlertDialog();
  const onClickAction = () => {
    alert("삭제 완료됐습니다.");
  };

  const onOpenChange = (open: boolean) => {
    if (!open) {
      alert("닫혀짐");
    }
  };

  const onClick = () => {
    open({
      title: "로우 삭제",
      children: "삭제하시겠습니까?",
      closeButtonLabel: "취소",
      onClickAction,
      onOpenChange,
    });
  };
  return <button onClick={onClick}>Click here!</button>;
};

export const UseAlertDialogHook: Story = {
  ...Basic,
  name: "[useAlertDialog] 사용 예시",
  render: () => {
    return (
      <AlertDialogProvider>
        <UseAlertDialogComponent />
      </AlertDialogProvider>
    );
  },
};

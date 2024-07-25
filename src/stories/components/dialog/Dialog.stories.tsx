import type { Meta, StoryObj } from "@storybook/react";
import { Dialog } from ".";
import { useState } from "react";
import { userEvent, within } from "@storybook/test";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicDialog: Story = {
  args: {
    title: "title",
    children: "content",
  },
  decorators: [
    (story) => {
      const [isOpen, setIsOpen] = useState(false);
      const onDelete = () => {
        setIsOpen(false);
      };
      return (
        <div style={{ margin: "3em" }}>
          <button onClick={() => setIsOpen((prev) => !prev)}>Click</button>
          {story({
            args: {
              isOpen,
              title: "Sample Dialog",
              onRequestClose: onDelete,
              action: () => {
                console.log("action!");
                onDelete();
              },
            },
          })}
        </div>
      );
    },
  ],
  play: async (params) => {
    const canvas = within(params.canvasElement);
    await userEvent.click(canvas.getByTestId("button"), {
      delay: 600,
    });
  },
};

import * as RadixDialog from "@radix-ui/react-dialog";

import styles from "./dialog.module.css";
import classNames from "classnames/bind";
import { Button } from "../button/Button";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ReactNode } from "react";

const cx = classNames.bind(styles);

type DialogProps = {
  title: string;
  children: ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  size?: "small" | "medium" | "large";
  onOpenChange?(open: boolean): void;
  onRequestClose?: (
    event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>
  ) => void;
  buttonTitle?: string;
  action?: any;
};

export const Dialog = (props: DialogProps) => {
  const {
    title,
    isOpen = false,
    defaultOpen,
    size = "medium",
    onOpenChange,
    onRequestClose,
    children,
    buttonTitle = "Save",
    action,
  } = props;

  const handleClickClose = (event: React.MouseEvent<Element, MouseEvent>) => {
    if (onRequestClose instanceof Function) {
      onRequestClose(event);
    }
  };
  return (
    <RadixDialog.Root
      open={isOpen}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.dialogOverlay}>
          <RadixDialog.Content
            className={cx(
              styles.dialogContent,
              styles[`dialogContent-${size}`]
            )}
          >
            <div className={styles.dialogHeader}>
              <RadixDialog.Title className={styles.dialogTitle}>
                {title}
              </RadixDialog.Title>
              <RadixDialog.Close
                asChild
                aria-label="Close"
                onClick={handleClickClose}
              >
                <button className={styles.dialogCloseIcon}>
                  <Cross2Icon />
                </button>
              </RadixDialog.Close>
            </div>
            <div className={styles.dialogChildren}>{children}</div>
            {action ? (
              <div className={cx(styles.dialogActions)}>
                <Button onClick={action}>{buttonTitle}</Button>
              </div>
            ) : null}
          </RadixDialog.Content>
        </RadixDialog.Overlay>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
};

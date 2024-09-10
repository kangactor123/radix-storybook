import { PropsWithChildren, ReactNode, useCallback } from "react";
import {
  Root,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
} from "@radix-ui/react-alert-dialog";

import { isUndefined } from "es-toolkit";
import classNames from "classnames/bind";

import styles from "./alertDialog.module.css";

const cx = classNames.bind(styles);

type AlertDialogActionMouseEvent = React.MouseEvent<
  HTMLButtonElement | HTMLDivElement
>;
type AlertDialogProps = {
  open: boolean;
  title: ReactNode;
  closeButtonLabel?: string;
  actionButtonLabel?: string;
  defaultOpen?: boolean;
  onClickClose: (event?: AlertDialogActionMouseEvent) => void;
  onClickAction?: (event?: AlertDialogActionMouseEvent) => void;
  onOpenChange?: (open: boolean) => void;
};

const AlertDialog: React.FC<PropsWithChildren<AlertDialogProps>> = ({
  title,
  open,
  defaultOpen,
  children,
  closeButtonLabel,
  actionButtonLabel = "확인",
  onOpenChange,
  onClickAction,
  onClickClose,
}) => {
  const useCloseButton = !isUndefined(closeButtonLabel);

  const handleClickActionButton = useCallback(
    (event?: AlertDialogActionMouseEvent) => {
      if (onClickAction instanceof Function) {
        onClickAction(event);
      }
      onClickClose(event);
    },
    [onClickAction, onClickClose]
  );

  return (
    <Root open={open} onOpenChange={onOpenChange} defaultOpen={defaultOpen}>
      <Portal>
        <Overlay className={styles.overlay}>
          <Content className={styles.content}>
            <Title className={styles.title}>{title}</Title>
            <Description className={styles.description}>{children}</Description>
            <div className={styles.actionContainer}>
              {useCloseButton ? (
                <Cancel asChild>
                  <button
                    onClick={onClickClose}
                    className={cx("button", "mauve")}
                  >
                    {closeButtonLabel}
                  </button>
                </Cancel>
              ) : null}
              <Action asChild>
                <button
                  onClick={handleClickActionButton}
                  className={cx("button", "red")}
                >
                  {actionButtonLabel}
                </button>
              </Action>
            </div>
          </Content>
        </Overlay>
      </Portal>
    </Root>
  );
};

export type { AlertDialogActionMouseEvent, AlertDialogProps };
export default AlertDialog;

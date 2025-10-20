import * as ToastMessage from "@radix-ui/react-toast";
import classNames from "classnames/bind";
import styles from "./styles.module.css"; // ✅ css module 파일로 변경

const cx = classNames.bind(styles);

export type ToastRootProps = React.ComponentProps<typeof ToastMessage.Root>;

export type ToastProps = {
  isOpen: boolean;
  children: React.ReactNode;
  status?: "positive" | "issue" | "negative" | "neutral";
  position?:
    | "top"
    | "top-left"
    | "top-right"
    | "bottom"
    | "bottom-left"
    | "bottom-right";
  duration?: number;
  title?: string;
  showCloseButton?: boolean;
  className?: string;
  onOpenChange(open: boolean): void;
} & Omit<ToastRootProps, "open">;

export const Toast = ({
  isOpen,
  children,
  position = "bottom-right",
  duration = 4000,
  title,
  status = "positive",
  showCloseButton = true,
  className,
  onOpenChange,
  ...rootProps
}: ToastProps) => {
  // ✅ status를 CSS Module 클래스 명으로 매핑
  const statusClass = {
    positive: styles.toastPositive,
    issue: styles.toastIssue,
    negative: styles.toastNegative,
    neutral: styles.toastNeutral,
  }[status];

  return (
    <ToastMessage.Root
      className={cx(styles.toastRoot, statusClass, className)}
      data-position={position}
      data-testid="toast"
      duration={duration}
      open={isOpen}
      onOpenChange={onOpenChange}
      {...rootProps}
    >
      <div className={cx(styles.contentWrapper)}>
        {status ? (
          <div aria-label="icon" className={cx(styles.iconWrapper)}>
            <span />
          </div>
        ) : null}
        <div>
          {title && (
            <ToastMessage.Title aria-label="title" className={cx(styles.title)}>
              {title}
            </ToastMessage.Title>
          )}
          <ToastMessage.Description
            aria-label="description"
            className={cx(styles.description)}
          >
            {children}
          </ToastMessage.Description>
        </div>
      </div>

      {showCloseButton && (
        <ToastMessage.Close
          aria-label="close"
          className={cx(styles.closeButton)}
          data-testid="close-button"
        />
      )}
    </ToastMessage.Root>
  );
};

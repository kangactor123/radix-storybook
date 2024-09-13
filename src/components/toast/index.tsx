import type { ComponentProps, ReactNode } from "react";
import {
  Provider,
  Root,
  Title,
  Description,
  Close,
  Viewport,
} from "@radix-ui/react-toast";

import { Cross2Icon } from "@radix-ui/react-icons";

import classNames from "classnames/bind";

import styles from "./styles.module.css";

const cx = classNames.bind(styles);

const DEFAULT_DURATION = 5000;

type RootProps = ComponentProps<typeof Root>;
type ToastProps = {
  open: boolean;
  description: ReactNode;
  className?: string;
  title?: string;
  onOpenChange: (open: boolean) => void;
} & Omit<RootProps, "open">;

const Toast: React.FC<ToastProps> = ({
  open,
  description,
  title,
  className,
  duration = DEFAULT_DURATION,
  onOpenChange,
  ...rootProps
}) => {
  return (
    <Provider>
      <Root
        {...rootProps}
        open={open}
        className={cx(styles.root, className)}
        onOpenChange={onOpenChange}
      >
        <div className={styles.container}>
          {title ? (
            <Title className={styles.title} aria-label="title">
              {title}
            </Title>
          ) : null}
          <Description className={styles.description} aria-label="description">
            {description}
          </Description>
        </div>
        <Close aria-label="close-button" className={styles.closeButton}>
          <Cross2Icon aria-hidden />
        </Close>
      </Root>
      <Viewport className={styles.viewport} />
    </Provider>
  );
};

export { Toast };

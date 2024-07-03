import { CSSProperties, PropsWithChildren } from "react";
import styles from "./button.module.css";
import classNames from "classnames";

const cx = classNames.bind(styles);

type ButtonProps = {
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  onClick?: () => void;
  variant?: "primary" | "secondary" | "warning";
  style?: CSSProperties;
};

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  size = "medium",
  style,
  variant = "primary",
  children,
  ...props
}: PropsWithChildren<ButtonProps>) => {
  return (
    <button
      type="button"
      className={cx([
        styles["storybook-button"],
        styles[`storybook-button--${variant}`],
        styles[`storybook-button--${size}`],
      ])}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};

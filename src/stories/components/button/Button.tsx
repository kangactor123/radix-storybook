import { CSSProperties } from "react";
import styles from "./button.module.css";
import classNames from "classnames";

const cx = classNames.bind(styles);

type ButtonProps = {
  backgroundColor?: string;
  size?: "small" | "medium" | "large";
  label: string;
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
  label,
  variant = "primary",
  ...props
}: ButtonProps) => {
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
      {label}
    </button>
  );
};

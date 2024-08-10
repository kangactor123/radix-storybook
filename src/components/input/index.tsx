import React from "react";
import { Primitive, PrimitivePropsWithRef } from "@radix-ui/react-primitive";
import styles from "./input.module.css";

import classNames from "classnames/bind";

const cx = classNames.bind(styles);

type InputProps = {
  size?: "small" | "medium" | "large";
} & Omit<PrimitivePropsWithRef<"input">, "size">;

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    const { className, size = "medium", ...inputProps } = props;
    return (
      <Primitive.input
        ref={ref}
        className={cx(styles.input, styles[size], className)}
        {...inputProps}
      />
    );
  }
);

import styles from "./checkbox.module.css";
import classNames from "classnames/bind";
import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { CheckIcon } from "@radix-ui/react-icons";

const cx = classNames.bind(styles);

type CheckboxProps = {
  id: string;
  label?: string;
} & RadixCheckbox.CheckboxProps;

export const Checkbox = ({ id, label, ...props }: CheckboxProps) => {
  return (
    <div className={cx(styles.container)}>
      <RadixCheckbox.Root
        id={id}
        className={cx(styles.checkboxRoot)}
        {...props}
      >
        <RadixCheckbox.Indicator className={styles.checkboxIndicator}>
          <CheckIcon />
        </RadixCheckbox.Indicator>
      </RadixCheckbox.Root>
      {label && (
        <label className={cx(styles.label)} htmlFor={id}>
          {label}
        </label>
      )}
    </div>
  );
};

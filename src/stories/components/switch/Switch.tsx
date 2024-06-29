import * as RadixSwitch from "@radix-ui/react-switch";
import styles from "./switch.module.css";
import { CSSProperties } from "react";

type SwitchProps = {
  switchProps?: RadixSwitch.SwitchProps;
  switchThumbProps?: RadixSwitch.SwitchThumbProps;
  label?: string;
  labelStyle?: CSSProperties;
};

export const Switch = ({
  label,
  labelStyle,
  switchProps,
  switchThumbProps,
}: SwitchProps) => {
  return (
    <div className={styles.switchContainer}>
      {label && (
        <label className={styles.label} style={labelStyle}>
          {label}
        </label>
      )}
      <RadixSwitch.Root
        id={`switch-thumb-${label}`}
        className={styles.switchRoot}
        {...switchProps}
      >
        <RadixSwitch.Thumb
          className={styles.switchThumb}
          {...switchThumbProps}
        />
      </RadixSwitch.Root>
    </div>
  );
};

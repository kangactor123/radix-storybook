import styles from "./select.module.css";
import * as RadixSelect from "@radix-ui/react-select";
import classnames from "classnames";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";

const cx = classnames.bind(styles);

type SelectItem = {
  label?: string;
  hasSeparator?: boolean;
} & RadixSelect.SelectItemProps;

type SelectProps = {
  selectItems: SelectItem[];
  selectRootProps: RadixSelect.SelectProps;
  selectContentProps?: RadixSelect.SelectContentProps;
  placeholder?: string;
};

const SelectItem = (props: SelectItem) => {
  return (
    <>
      {props?.label && (
        <RadixSelect.Label className={styles.selectLabel}>
          {props.label}
        </RadixSelect.Label>
      )}
      <RadixSelect.Item
        value={props.value}
        disabled={props.disabled}
        className={styles.selectItem}
      >
        <RadixSelect.ItemText>{props.textValue}</RadixSelect.ItemText>
        <RadixSelect.SelectItemIndicator className={styles.selectItemIndicator}>
          <CheckIcon />
        </RadixSelect.SelectItemIndicator>
      </RadixSelect.Item>
      {props?.hasSeparator && (
        <RadixSelect.SelectSeparator className={styles.selectSeparator} />
      )}
    </>
  );
};

export const Select = (props: SelectProps) => {
  return (
    <RadixSelect.Root {...props.selectRootProps}>
      <RadixSelect.Trigger className={cx(styles.selectTrigger)}>
        <RadixSelect.Value placeholder={props.placeholder}>
          {props.selectRootProps.value}
        </RadixSelect.Value>
        <RadixSelect.Icon className={styles.selectIcon}>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          {...props.selectContentProps}
          className={cx(
            styles.selectContent,
            props.selectContentProps?.className
          )}
        >
          <RadixSelect.ScrollUpButton className={styles.selectScrollButton}>
            <ChevronUpIcon />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.ScrollDownButton className={styles.selectScrollButton}>
            <ChevronDownIcon />
          </RadixSelect.ScrollDownButton>
          <RadixSelect.Viewport className={styles.selectViewport}>
            {props.selectItems.map((item) => {
              return (
                <RadixSelect.Group>
                  <SelectItem {...item} />
                </RadixSelect.Group>
              );
            })}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
};

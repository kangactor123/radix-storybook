import styles from "./select.module.css";
import * as RadixSelect from "@radix-ui/react-select";
import classnames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { PropsWithChildren, ReactNode, useState } from "react";

const cx = classnames.bind(styles);

type SeperatorPosition = "top" | "bottom";
type SelectItem = {
  label: ReactNode;
  onChangeValue?: (value: string) => void;
  title?: ReactNode;
  hasSepeartor?: false | SeperatorPosition;
  isSelected?: boolean;
} & Omit<RadixSelect.SelectItemProps, "label" | "textValue">;

type SelectProps = {
  selectItems: SelectItem[];
  selectRootProps: Omit<RadixSelect.SelectProps, "value" | "onValueChange"> & {
    values: string[];
    onChangeValues: (value: string[]) => void;
  };
  selectContentProps?: RadixSelect.SelectContentProps;
  placeholder?: string;
  isLoading?: boolean;
};

const {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  Viewport,
  Group,
  Label,
  Item,
  ItemText,
  SelectSeparator,
} = RadixSelect;

const SelectWrapper = ({
  hasSepartor,
  children,
}: PropsWithChildren<{
  hasSepartor: false | SeperatorPosition;
}>) => {
  return typeof hasSepartor === "string" ? (
    <>
      {hasSepartor === "top" && (
        <SelectSeparator className={styles.selectSeparator} />
      )}
      {children}
      {hasSepartor === "bottom" && (
        <SelectSeparator className={styles.selectSeparator} />
      )}
    </>
  ) : (
    <>{children}</>
  );
};

const SelectItem = (props: SelectItem) => {
  const {
    title,
    value,
    disabled,
    label,
    isSelected = false,
    hasSepeartor = false,
    onChangeValue,
  } = props;
  const onClick = (value: string) => {
    if (onChangeValue instanceof Function) {
      onChangeValue(value);
    }
  };
  return (
    <SelectWrapper hasSepartor={hasSepeartor}>
      {title ? <Label className={styles.selectLabel}>{title}</Label> : null}
      <Item
        value={value}
        disabled={disabled}
        className={styles.selectItem}
        onClick={() => onClick(value)}
      >
        <input
          type="checkbox"
          checked={isSelected}
          disabled={disabled}
          onChange={() => onClick(value)}
        />
        <ItemText>{label}</ItemText>
      </Item>
    </SelectWrapper>
  );
};

export const MultiSelect = (props: SelectProps) => {
  const {
    selectRootProps: { values, onChangeValues, ...rootProps },
    selectContentProps,
    placeholder,
    selectItems,
  } = props;
  const [open, setOpen] = useState(false);
  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  const onValueChange = (selectedValue: string) => {
    let newValue = [...values];
    const isSelected = values.some((value) => value === selectedValue);
    if (isSelected) {
      const filteredValues = values.filter((value) => value !== selectedValue);
      newValue = [...filteredValues];
    } else {
      newValue.push(selectedValue);
    }
    onChangeValues(newValue);
  };
  return (
    <Root {...rootProps} open={open}>
      <Trigger className={cx(styles.selectTrigger)} onClick={toggleMenu}>
        {values.length === 0 ? (
          <Value placeholder={placeholder} />
        ) : (
          values.map((value) => <Value key={value}>{value}</Value>)
        )}
        <Icon className={styles.selectIcon}>
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          {...selectContentProps}
          aria-multiselectable
          onEscapeKeyDown={toggleMenu}
          onPointerDownOutside={toggleMenu}
          className={cx(styles.selectContent, selectContentProps?.className)}
        >
          <Viewport className={styles.selectViewport}>
            {selectItems.map((item) => {
              const isSelected = values.includes(item.value);
              return (
                <Group key={item.value}>
                  <SelectItem
                    {...item}
                    onChangeValue={onValueChange}
                    isSelected={isSelected}
                  />
                </Group>
              );
            })}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};

import styles from "./select.module.css";
import * as RadixSelect from "@radix-ui/react-select";
import classnames from "classnames";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { PropsWithChildren, ReactNode } from "react";

const cx = classnames.bind(styles);

type SeperatorPosition = "top" | "bottom";
type SelectItem = {
  label: ReactNode;
  title?: ReactNode;
  hasSepeartor?: false | SeperatorPosition;
  values?: string[];
} & Omit<RadixSelect.SelectItemProps, "label" | "textValue">;

type SelectProps = {
  selectItems: SelectItem[];
  selectRootProps: RadixSelect.SelectProps;
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
  const { title, value, disabled, label, hasSepeartor = false } = props;
  return (
    <SelectWrapper hasSepartor={hasSepeartor}>
      {title ? <Label className={styles.selectLabel}>{title}</Label> : null}
      <Item value={value} disabled={disabled} className={styles.selectItem}>
        <ItemText>{label}</ItemText>
      </Item>
    </SelectWrapper>
  );
};

export const Select = (props: SelectProps) => {
  return (
    <Root {...props.selectRootProps}>
      <Trigger className={cx(styles.selectTrigger)}>
        <Value placeholder={props.placeholder}>
          {props.selectRootProps.value}
        </Value>
        <Icon className={styles.selectIcon}>
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          {...props.selectContentProps}
          className={cx(
            styles.selectContent,
            props.selectContentProps?.className
          )}
        >
          <Viewport className={styles.selectViewport}>
            {props.selectItems.map((item) => (
              <Group key={item.value}>
                <SelectItem {...item} />
              </Group>
            ))}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};

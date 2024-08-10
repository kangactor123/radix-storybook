import { memo, useEffect, useRef, useState } from "react";
import classnames from "classnames/bind";

import * as RadixSelect from "@radix-ui/react-select";

import { SelectOption as SelectOptionType, SelectProps } from "../type";
import {
  DEFAULT_VIEWPORT_WIDTH,
  EMPTY_VALUE,
  ERROR_MSG,
  LOADING_MSG,
  PLACEHOLDER_MSG,
} from "../constant";

import selectArrow from "../../../assets/image/select_arr_wg.png";
import styles from "../styles.module.css";

const cx = classnames.bind(styles);
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
} = RadixSelect;

const SelectOption = memo((props: SelectOptionType) => {
  const { title, value, disabled, label, isSelected } = props;
  return (
    <>
      {title ? <Label className={styles.selectLabel}>{title}</Label> : null}
      <Item
        value={value}
        disabled={disabled}
        className={cx(styles.selectOption)}
        data-selected={isSelected}
      >
        {label}
      </Item>
    </>
  );
});

export const Select = (props: SelectProps) => {
  const {
    options,
    triggerProps,
    rootProps,
    contentProps = {},
    isLoading = false,
    isError = false,
    isValidateError = false,
    useEmptyOption = true,
    placeholder = PLACEHOLDER_MSG,
    loadingMessage = LOADING_MSG,
    errorMessage = ERROR_MSG,
  } = props;

  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const [viewportWidth, setViewportWidth] = useState<number>(
    DEFAULT_VIEWPORT_WIDTH
  );

  const selectedLabel = options.find(
    ({ value }) => value === rootProps?.value
  )?.label;
  const triggerValue = isLoading
    ? loadingMessage
    : isError
      ? errorMessage
      : selectedLabel;
  const displayOptions = [
    ...(useEmptyOption
      ? [
          {
            label: PLACEHOLDER_MSG,
            value: EMPTY_VALUE,
          },
        ]
      : []),
    ...options,
  ];

  const onValueChange = (value: string) => {
    if (rootProps.onValueChange) {
      const newValue = value === EMPTY_VALUE ? "" : value;
      rootProps.onValueChange(newValue);
    }
  };

  // Trigger Change Event for specific option
  useEffect(() => {
    const selectedValue = rootProps.value;
    const selectedOption = displayOptions.find(
      ({ value }) => value === selectedValue
    );
    if (selectedOption && selectedOption?.onChangeValue) {
      selectedOption.onChangeValue(selectedValue ?? "");
    }
  }, [rootProps.value]);

  // Adjust width of Viewport to equal with width of Trigger
  useEffect(() => {
    const trigger = triggerRef.current;
    if (trigger) {
      const { width } = trigger.getBoundingClientRect();
      setViewportWidth(width);
    }
  }, []);

  return (
    <Root
      {...rootProps}
      disabled={isError || isLoading || rootProps?.disabled}
      onValueChange={onValueChange}
    >
      <Trigger
        ref={triggerRef}
        style={triggerProps?.style}
        className={cx(styles.selectTrigger, triggerProps?.className)}
        data-isvalidateerror={isValidateError}
      >
        <div className={styles.triggerViewport}>
          {typeof triggerValue === "object" || isLoading || isError ? (
            triggerValue
          ) : (
            <Value placeholder={placeholder}>{triggerValue ?? ""}</Value>
          )}
        </div>
        <Icon className={styles.selectIcon}>
          <img src={selectArrow} />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          {...contentProps}
          sideOffset={contentProps?.sideOffset ?? 5}
          position={contentProps?.position ?? "popper"}
          className={cx(styles.selectContent, contentProps?.className)}
          style={{ width: viewportWidth }}
        >
          <Viewport className={styles.selectViewport}>
            {displayOptions.map((option, index) => {
              const isSelected = rootProps.value === option.value;
              return (
                <Group key={`${option.value}-${index}`}>
                  <SelectOption {...option} isSelected={isSelected} />
                </Group>
              );
            })}
          </Viewport>
        </Content>
      </Portal>
    </Root>
  );
};

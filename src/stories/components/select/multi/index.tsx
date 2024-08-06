import { memo, useCallback, useEffect, useRef, useState } from "react";
import classnames from "classnames/bind";

import * as RadixSelect from "@radix-ui/react-select";

import { SelectOption as SelectOptionType, MultiSelectProps } from "../type";
import {
  DEFAULT_VIEWPORT_WIDTH,
  ERROR_MSG,
  LOADING_MSG,
  PLACEHOLDER_MSG,
} from "../constant";

import selectArrow from "../../../../assets/image/select_arr_wg.png";
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

type OptionDeleteHandler = (value: string) => React.MouseEventHandler;

const SelectOption = memo((props: SelectOptionType) => {
  const { title, value, disabled, label, onChangeValue, isSelected } = props;
  const onClick = useCallback(
    (value: string) => {
      if (onChangeValue instanceof Function) {
        onChangeValue(value);
      }
    },
    [onChangeValue]
  );

  return (
    <>
      {title ? <Label className={styles.selectLabel}>{title}</Label> : null}
      <Item
        value={value}
        disabled={disabled}
        className={cx(styles.selectOption)}
        onClick={() => onClick(value)}
        data-selected={isSelected}
      >
        {label}
      </Item>
    </>
  );
});

export const MultiSelect = (props: MultiSelectProps) => {
  const {
    options,
    triggerProps,
    rootProps: { values, onChangeValues, ...rootProps },
    contentProps,
    isError = false,
    isLoading = false,
    isValidateError = false,
    placeholder = PLACEHOLDER_MSG,
    errorMessage = ERROR_MSG,
    loadingMessage = LOADING_MSG,
  } = props;

  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [viewportWidth, setViewportWidth] = useState<number>(
    DEFAULT_VIEWPORT_WIDTH
  );

  const isEmptyValues = values.length === 0;

  const onValueChange = (selectedValue: string) => {
    let newValue = [...values];
    const isSelected = values.some((value) => value === selectedValue);
    if (isSelected) {
      const filteredValues = values.filter((value) => value !== selectedValue);
      newValue = [...filteredValues];
    } else {
      newValue = [selectedValue, ...newValue];
    }
    onChangeValues(newValue);
    toggleMenu();
  };

  const onClearOption: OptionDeleteHandler = (selectedValue) => (event) => {
    event.stopPropagation();
    const filteredValues = values.filter((value) => value !== selectedValue);
    onChangeValues(filteredValues);
  };

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

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
      open={open}
    >
      <Trigger
        ref={triggerRef}
        data-multiple
        onClick={toggleMenu}
        style={triggerProps?.style}
        className={cx(styles.selectTrigger, triggerProps?.className)}
        data-isvalidateerror={isValidateError}
      >
        {isLoading ? (
          loadingMessage
        ) : isError ? (
          errorMessage
        ) : isEmptyValues ? (
          <Value placeholder={placeholder}>{placeholder}</Value>
        ) : (
          <div className={styles.triggerViewport}>
            {values.map((value) => (
              <span key={value} className={styles.selectedLabel}>
                <Value>{value}</Value>
                <span
                  onClick={onClearOption(value)}
                  className={styles.clearIcon}
                />
              </span>
            ))}
          </div>
        )}
        {!isEmptyValues ? (
          <Icon
            style={{ position: "absolute", right: 30 }}
            className={styles.clearIcon}
            onClick={(event) => {
              event.stopPropagation();
              onChangeValues([]);
            }}
          >
            <span />
          </Icon>
        ) : null}
        <Icon className={styles.selectIcon}>
          <img src={selectArrow} />
        </Icon>
      </Trigger>
      <Portal>
        <Content
          {...contentProps}
          aria-multiselectable
          sideOffset={contentProps?.sideOffset ?? 5}
          position={contentProps?.position ?? "popper"}
          onEscapeKeyDown={toggleMenu}
          onPointerDownOutside={toggleMenu}
          className={cx(styles.selectContent, contentProps?.className)}
          style={{ width: viewportWidth }}
        >
          <Viewport className={styles.selectViewport}>
            {options.map((option, index) => {
              const isSelected = values.includes(option.value);
              const onChange = (value: string) => {
                onValueChange(value);
                if (option.onChangeValue instanceof Function) {
                  option.onChangeValue(value);
                }
              };
              return (
                <Group key={`${option.value}-${index}`}>
                  <SelectOption
                    {...option}
                    onChangeValue={onChange}
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

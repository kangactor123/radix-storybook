import { CSSProperties, ReactNode } from 'react';
import * as RadixSelect from '@radix-ui/react-select';

export type SelectOption = {
   label: ReactNode;
   title?: ReactNode;
   isSelected?: boolean;
   onChangeValue?: (value: string) => void;
} & Omit<RadixSelect.SelectItemProps, 'label' | 'textValue'>;

export type SelectProps = {
   options: SelectOption[];
   rootProps: RadixSelect.SelectProps;
   contentProps?: RadixSelect.SelectContentProps;
   triggerProps?: {
      className?: string;
      style?: CSSProperties;
   };
   placeholder?: string;
   loadingMessage?: string;
   errorMessage?: string;
   useEmptyOption?: boolean;
   isLoading?: boolean;
   isError?: boolean;
   isValidateError?: boolean;
};

export type MultiSelectProps = Omit<SelectProps, 'rootProps' | 'useEmptyOption'> & {
   rootProps: Omit<RadixSelect.SelectProps, 'value' | 'onValueChange'> & {
      values: string[];
      onChangeValues: (values: string[]) => void;
   };
};

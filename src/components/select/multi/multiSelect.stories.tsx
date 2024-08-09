import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { MultiSelect } from ".";
import { SelectOption } from "../type";

const sampleOptions: SelectOption[] = [
  {
    label: "first",
    value: "first",
  },
  {
    label: "second",
    value: "second",
  },
  {
    label: "fourth",
    value: "fourth",
  },
  {
    label: "fifth",
    value: "fifth",
  },
  {
    label: "six",
    value: "six",
  },
  {
    label: "seven",
    value: "seven",
  },
  {
    label: "eight",
    value: "eight",
  },
  {
    label: "nine",
    value: "nine",
  },
];
const basicArgs = {
  rootProps: { values: [], onChangeValues: () => {} },
  options: sampleOptions,
};

const meta = {
  title: "UI/Select/Multi",
  component: MultiSelect,
} satisfies Meta<typeof MultiSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: basicArgs,
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);
    const onChangeValues = (values: string[]) => {
      setValues(values);
    };
    return (
      <>
        <h3>선택된 값</h3>
        <p>{values.join(", ")}</p>
        <MultiSelect {...args} rootProps={{ values, onChangeValues }} />
      </>
    );
  },
};

export const LoadingSelect: Story = {
  args: basicArgs,
  render: (args) => {
    const [loading, setLoading] = useState(true);
    const [values, setValues] = useState<string[]>([]);
    const onChangeValues = (values: string[]) => {
      setValues(values);
    };
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, []);
    return (
      <MultiSelect
        {...args}
        isLoading={loading}
        rootProps={{ values, onChangeValues }}
      />
    );
  },
};

export const LoadingErrorSelect: Story = {
  args: basicArgs,
  render: (args) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 1500);
    }, []);
    return <MultiSelect {...args} isLoading={loading} isError={error} />;
  },
};

export const OptionFeatureSelect: Story = {
  args: {
    ...basicArgs,
    options: [
      { label: "title", value: "title", title: "제목" },
      { label: "disabled", value: "disabled", disabled: true },
      {
        label:
          "라벨이 무진장 길 때 라벨이 무진장 길 때 라벨이 무진장 길 때 라벨이 무진장 길 때",
        value: "very-long-label",
      },
      {
        label: "onChangeValue",
        value: "onChangeValue",
        onChangeValue: (value) => alert(value),
      },
    ],
  },
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);
    const onChangeValues = (values: string[]) => {
      setValues(values);
    };
    return (
      <>
        <h3>선택된 값</h3>
        <p>{values.join(", ")}</p>
        <MultiSelect {...args} rootProps={{ values, onChangeValues }} />
      </>
    );
  },
};

export const ValidateSelect: Story = {
  args: basicArgs,
  render: (args) => {
    const [values, setValues] = useState<string[]>([]);
    const [isValidateError, setIsValidateError] = useState(false);
    const onChangeValues = (values: string[]) => {
      setValues(values);
    };
    const onClick = () => {
      setIsValidateError(values.length === 0);
    };
    const message = "값이 비어있습니다.";
    return (
      <>
        <h3>빈 값 제출</h3>
        <div style={{ display: "flex", gap: 3 }}>
          <MultiSelect
            {...args}
            rootProps={{ values, onChangeValues }}
            isValidateError={isValidateError}
          />
          <button onClick={onClick}>제출</button>
        </div>
        {isValidateError && <p>{message}</p>}
      </>
    );
  },
};

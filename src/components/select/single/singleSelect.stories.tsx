import type { Meta, StoryObj } from "@storybook/react";
import { useEffect, useState } from "react";
import { Select } from ".";
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
    label: "third",
    value: "third",
  },
];
const meta = {
  title: "UI/Select/Single",
  component: Select,
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    options: sampleOptions,
    rootProps: {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const onValueChange = (value: string) => {
      setValue(value);
    };
    return (
      <>
        <h3>선택된 값</h3>
        <p>{value}</p>
        <Select {...args} rootProps={{ value, onValueChange }} />
      </>
    );
  },
};

export const LoadingSelect: Story = {
  args: {
    options: sampleOptions,
    rootProps: {},
  },
  render: (args) => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }, []);
    return <Select {...args} isLoading={loading} />;
  },
};

export const LoadingErrorSelect: Story = {
  args: {
    options: sampleOptions,
    rootProps: {},
  },
  render: (args) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    useEffect(() => {
      setTimeout(() => {
        setLoading(false);
        setError(true);
      }, 1500);
    }, []);
    return <Select {...args} isLoading={loading} isError={error} />;
  },
};

const CustomCompoent = ({ label }: { label: string }) => {
  return (
    <div
      style={{
        width: "100%",
        height: 50,
        padding: 8,
        border: "1px solid green",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <span>{label}</span>
      <span>{label}</span>
      <span>{label}</span>
      <span>{label}</span>
    </div>
  );
};

export const CustomSingleSelect: Story = {
  args: {
    options: [
      ...sampleOptions,
      { label: <CustomCompoent label="custom" />, value: "custom" },
    ],
    rootProps: {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const onValueChange = (value: string) => {
      setValue(value);
    };
    return (
      <>
        <h3>선택된 값</h3>
        <p>{value}</p>
        <Select {...args} rootProps={{ value, onValueChange }} />
      </>
    );
  },
};

export const OptionFeatureSelect: Story = {
  args: {
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
    rootProps: {},
    useEmptyOption: false,
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const onValueChange = (value: string) => {
      setValue(value);
    };
    return (
      <>
        <h3>선택된 값</h3>
        <p>{value}</p>
        <Select {...args} rootProps={{ value, onValueChange }} />
      </>
    );
  },
};

export const ValidateSelect: Story = {
  args: {
    options: sampleOptions,
    rootProps: {},
  },
  render: (args) => {
    const [value, setValue] = useState("");
    const [isValidateError, setIsValidateError] = useState(false);
    const onClick = () => {
      setIsValidateError(value === "");
    };
    const message = "값이 비어있습니다.";
    return (
      <>
        <h3>선택해주세요. 제출클릭</h3>
        <div style={{ display: "flex", gap: 3 }}>
          <Select
            {...args}
            rootProps={{ onValueChange: (value) => setValue(value), value }}
            isValidateError={isValidateError}
          />
          <button onClick={onClick}>제출</button>
        </div>
        {isValidateError && <p>{message}</p>}
      </>
    );
  },
};

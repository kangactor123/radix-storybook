import { vi } from "vitest";

import { Input } from "../components/input";
import { fireEvent, render, screen } from "@testing-library/react";

const VALUE = {
  INIT_VALUE: "INIT_VALUE",
  NEW_VALUE: "NEW_VALUE",
} as const;

const onChange = vi.fn();

describe("Input Component", () => {
  it("Render Input Component", () => {
    render(<Input data-testid="input" defaultValue={VALUE.INIT_VALUE} />);

    const inputElement = screen.getByTestId("input") as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toBe(VALUE.INIT_VALUE);
  });

  it("Input 컴포넌트의 값의 변화를 체크합니다.", () => {
    render(
      <Input data-testid="input" value={VALUE.INIT_VALUE} onChange={onChange} />
    );

    const inputElement = screen.getByTestId("input") as HTMLInputElement;

    expect(inputElement).toHaveValue(VALUE.INIT_VALUE);

    // onChange 이벤트가 잘 작동되는지 테스트합니다.
    fireEvent.change(inputElement, { target: { value: VALUE.NEW_VALUE } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
  });
});

import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";
import { Switch } from "../components/switch";

describe("Switch Component", () => {
  it("Render Switch Component", () => {
    render(<Switch label="Dark" switchProps={{ onClick: () => {} }} />);
    const switchComponent = screen.getByText("Dark");
    expect(switchComponent).toBeInTheDocument();
  });

  it("Check Switch Component has Default Value", () => {
    render(<Switch label="Dark" switchProps={{ defaultChecked: true }} />);
    const switchComponent = screen.getByTestId("switch-thumb-Dark");
    expect(switchComponent).toHaveAttribute("aria-checked", "true");
  });

  it("Check Switch Component Toogle", () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch
        label="Dark"
        switchProps={{ onCheckedChange: onCheckedChange, defaultChecked: true }}
      />
    );
    const switchComponent = screen.getByTestId("switch-thumb-Dark");

    expect(switchComponent).toHaveAttribute("aria-checked", "true");

    fireEvent.click(switchComponent);

    expect(switchComponent).toHaveAttribute("aria-checked", "false");
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });

  it("Click Switch Component", async () => {
    const onCheckedChange = vi.fn();
    render(
      <Switch
        label="Dark"
        switchProps={{ onCheckedChange: onCheckedChange, defaultChecked: true }}
      />
    );

    const switchComponent = screen.getByTestId("switch-thumb-Dark");

    fireEvent.click(switchComponent);
    expect(onCheckedChange).toHaveBeenCalledTimes(1);
    expect(onCheckedChange).toHaveBeenCalledWith(false);
  });
});

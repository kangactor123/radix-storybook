// import { render, screen, fireEvent } from "@testing-library/react";
// import { describe, it, test } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { vi } from "vitest";

function sum(a: number, b: number) {
  return a + b;
}

// test: 테스트 케이스를 정의
// expect 테스트 할 값에 대한 예상 값 설정
test("덧셈 1+1 = 2", () => {
  expect(sum(1, 1)).toBe(2);
});

// 스냅샷 테스트
// 컴포넌트가 랜더링 된 것을 스냅샷 하고, UI 출력의 결과가 일치하는지 테스트 하는 기법
type TitleProps = {
  label: string;
  onClick: () => void;
};
const Title: React.FC<TitleProps> = ({ label, onClick }) => {
  return <h2 onClick={onClick}>{label}</h2>;
};

describe("Title Component", () => {
  it("rendering Title Component", () => {
    render(<Title label={"title!!"} onClick={() => {}} />);
    const title = screen.getByText("title!!");
    expect(title).toBeInTheDocument();
  });

  it("click title component", async () => {
    const handleClick = vi.fn();
    render(<Title label={"title"} onClick={handleClick} />);

    const button = screen.getByText("title");

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});

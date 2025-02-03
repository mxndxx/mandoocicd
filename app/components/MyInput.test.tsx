import * as React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react";
import MyInput from "./MyInput";

describe("MyInput", () => {
  test("should render correctly", () => {
    // MyInput 컴포넌트를 렌더링합니다.
    const wrapper = render(<MyInput />);
    // wrapper.unmount() 함수를 호출해도 에러가 발생하지 않는지 확인합니다.
    expect(() => wrapper.unmount()).not.toThrow();
  });

  test("should clear the value and onClear is triggered", async () => {
    // 필요하다면 jest mock 함수나 ref를 생성합니다.
    const mockOnClear = jest.fn();
    // MyInput 컴포넌트를 렌더링합니다.
    const { getByRole } = render(<MyInput onClear={mockOnClear} />);
    const input = getByRole("textbox");
    fireEvent.change(input, { target: { value: "test value" } });
    expect(input.value).toBe("test value");
    // clearButton을 클릭합니다.
    const clearButton = getByRole("button");
    fireEvent.click(clearButton);
    // input 요소의 값이 ""인지 확인합니다.
    await waitFor(() => expect(input.value).toBe(""));
    // onClear 함수가 한 번 호출되었는지 확인합니다.
    expect(mockOnClear).toHaveBeenCalledTimes(1);
  });
});

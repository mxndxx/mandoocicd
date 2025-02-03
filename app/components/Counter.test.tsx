import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter component", () => {
  // Increment 버튼을 여러 번 클릭하는 함수
  const clickIncrementButton = (times: number) => {
    for (let i = 0; i < times; i++) {
      fireEvent.click(screen.getByText("Increment"));
    }
  };
  
  test("renders and displays the correct initial state", () => {
    render(<Counter />);

    // 초기 상태에서 "Clicked 0 times"가 화면에 표시되는지 확인
    expect(screen.getByTestId("count").textContent).toBe("Clicked 0 times");
  });

  test("increments the count when the Increment button is clicked", () => {
    render(<Counter />);

    // Increment 버튼을 클릭
    clickIncrementButton(1);

    // 클릭 후 count 값이 "Clicked 1 time"으로 업데이트되는지 확인
    expect(screen.getByTestId("count").textContent).toBe("Clicked 1 time");
  });

  test("increments the count when the Increment button is multiple clicked", () => {
    render(<Counter />);

    // Increment 버튼을 3번 클릭
    clickIncrementButton(3);

    // 클릭 후 count 값이 "Clicked 3 times"로 업데이트되는지 확인
    const countElement = screen.getByTestId("count");
    expect(countElement.textContent).toBe("Clicked 3 times");
  });

  test("increments the count correctly for different Increment button is clicked", () => {
    render(<Counter />);

    // Increment 버튼을 5번 클릭
    clickIncrementButton(5);
    const countElement = screen.getByTestId("count");
    expect(countElement.textContent).toBe("Clicked 5 times");

    // Increment 버튼을 2번 클릭 추가
    clickIncrementButton(2);
    expect(countElement.textContent).toBe("Clicked 7 times");
  });

  test("changes the document title when the checkbox is checked", () => {
    render(<Counter />);

    const initialTitle = document.title;

    // 체크박스를 클릭하여 checked 상태로 변경
    fireEvent.click(
      screen.getByLabelText(/Check to display count in document title/i)
    );

    // 체크박스를 클릭했을 때
    expect(document.title).toBe(`Total number of clicks: 0`);

    // Increment 버튼을 클릭해서 count를 증가시키고, 제목이 다시 변경되는지 확인
    clickIncrementButton(1);
    expect(document.title).toBe(`Total number of clicks: 1`);

    // clickIncrementButton(3);
    // expect(document.title).toBe(`Total number of clicks: 4`);

    // 체크박스를 다시 해제했을 때, 제목이 원래대로 돌아오는지 확인
    fireEvent.click(
      screen.getByLabelText(/Check to display count in document title/i)
    );
    expect(document.title).toBe(initialTitle);
  });
});

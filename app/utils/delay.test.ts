import delay from "./delay";

describe("delay function", () => {
  test("executes the provided function after the specified delay using done", (done) => {
    const mockFunction = jest.fn();

    delay(() => {
      mockFunction("Hello, world!");
      expect(mockFunction).toHaveBeenCalledWith("Hello, world!");
      done(); // 비동기 테스트 종료
    }, 100);
  });

  test("executes the function with the correct arguments using mock function", (done) => {
    const mockFunction = jest.fn();
    const args = ["arg1", "arg2"];

    delay(mockFunction, 50, ...args);

    setTimeout(() => {
      expect(mockFunction).toHaveBeenCalledWith("arg1", "arg2");
      expect(mockFunction).toHaveBeenCalledTimes(1);
      done(); // 비동기 테스트 종료
    }, 100); // wait + margin 시간
  });

  test("throws an error if the first argument is not a function", () => {
    expect(() => delay(123 as any, 100)).toThrow(TypeError);
    expect(() => delay(null as any, 100)).toThrow("Expected a function");
  });
});

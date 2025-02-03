import { fireEvent, render, screen } from "@testing-library/react";
import Greeting from "./greetingBtn";

test("test greeting", async () => {
  render(<Greeting />); // 컴포넌트를 렌더링

  fireEvent.click(screen.getByText("Load Greeting"));

  // wait until the `get` request promise resolves and
  // the component calls setState and re-renders,
  // throwing an error if it cannot find an element
  await screen.findByRole("heading");
});

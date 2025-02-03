import "@testing-library/jest-dom";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import Login from "./Login";

// axios mock에 대한 타입 정의
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Login Component", () => {
  beforeEach(() => {
    window.localStorage.removeItem("token");
  });

  it("displays success message when login succeeds", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { token: "test-token" },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(axios.post).toHaveBeenCalledWith("/api/login", {
      username: "testuser",
      password: "testpassword",
    });

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent(
        "Congrats! You're signed in!"
      )
    );

    expect(window.localStorage.getItem("token")).toBe("test-token");
  });

  it("shows loading state while submitting", async () => {
    (axios.post as jest.Mock).mockResolvedValueOnce({
      data: { token: "test-token" },
    });

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "testuser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "testpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByRole("button")).toHaveTextContent("Submit...");

    await waitFor(() => expect(screen.getByRole("alert")).toBeTruthy());
  });

  it("displays error message when login fails", async () => {
    (axios.post as jest.Mock).mockRejectedValueOnce(new Error("Login failed"));

    render(<Login />);

    fireEvent.change(screen.getByLabelText(/username/i), {
      target: { value: "wronguser" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("Login failed")
    );

    expect(window.localStorage.getItem("token")).toBeNull();
  });
});

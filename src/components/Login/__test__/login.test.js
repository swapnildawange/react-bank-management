import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../setupTests";
import Login from "../Login";

describe("Login render Page", () => {
  test("render 2 input components", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  test("renders a submit button", () => {
    render(<Login />);
    expect(screen.getByTitle(/Login/i)).toBeInTheDocument();
  });
});

describe("simulate login behavior", () => {
  test("login with valid credentials", async () => {
    render(<Login />);
    userEvent.type(screen.getByLabelText(/email/i), "vivek@gmail.com");
    userEvent.type(screen.getByLabelText(/password/i), "vivek@123");
    userEvent.click(screen.getByTitle(/Login/i));
    expect(screen.getByTitle(/Login/i)).toBeEnabled();
  });
});


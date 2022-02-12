import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../setupTests";
import SignUp from "../SignUp";

describe("SignUp render Page", () => {
  test("render 2 input components", () => {
    render(<SignUp />);
    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/middle name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/female/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText(/other/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/day/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/month/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/year/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

    expect(screen.getByTitle(/sign up/i)).toBeInTheDocument();
  });

  test("renders a sign up button", () => {
    render(<SignUp />);
    expect(screen.getByTitle(/sign up/i)).toBeInTheDocument();
  });
});

describe("simulate sign up behavior", () => {
  test("sign up with valid credentials", async () => {
    render(<SignUp />);
    userEvent.type(screen.getByLabelText(/First Name/i), "Akash");
    userEvent.type(screen.getByLabelText(/middle name/i), "Mulchand");
    userEvent.type(screen.getByLabelText(/last name/i), "Chavan");
    userEvent.type(screen.getByLabelText(/day/i), "3");
    userEvent.type(screen.getByLabelText(/month/i), "4");
    userEvent.type(screen.getByLabelText(/year/i), "2000");
    userEvent.type(screen.getByLabelText(/email/i), "vivek@gmail.com");
    userEvent.type(screen.getByLabelText(/password/i), "vivek@123");
    expect(screen.getByTitle(/sign up/i)).toBeEnabled();
  });
});

import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../setupTests";
import Withdraw from "../Withdraw";

describe("Login render Page", () => {
  test("render  input component", () => {
    render(<Withdraw />);
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
  });

  test("renders a submit button", () => {
    render(<Withdraw />);
    expect(screen.getByTitle(/withdraw/i)).toBeInTheDocument();
  });
});

describe("simulate withdraw behavior", () => {
  test("withdraw operation", async () => {
    render(<Withdraw />);
    userEvent.type(screen.getByLabelText(/amount/i), "100");
    userEvent.click(screen.getByTitle(/withdraw/i));
    expect(screen.getByTitle(/withdraw/i)).toBeEnabled();
  });
});

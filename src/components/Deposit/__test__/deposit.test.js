import "@testing-library/jest-dom";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render } from "../../../setupTests";
import Deposit from "../Deposit";

describe("Login render Page", () => {
  test("render  input component", () => {
    render(<Deposit />);
    expect(screen.getByLabelText(/Amount/i)).toBeInTheDocument();
  });

  test("renders a submit button", () => {
    render(<Deposit />);
    expect(screen.getByTitle(/Deposit/i)).toBeInTheDocument();
  });
});

describe("simulate deposit behavior", () => {
  test("deposit operation", async () => {
    render(<Deposit />);
    userEvent.type(screen.getByLabelText(/amount/i), "100");
    userEvent.click(screen.getByTitle(/Deposit/i));
    expect(screen.getByTitle(/Deposit/i)).toBeEnabled();
  });
});

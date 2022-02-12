import {  screen } from "@testing-library/react";
import { render } from "../../../setupTests";
import Login from "../Login";

describe("Login render Page", () => {
  // beforeEach(() => {
  //   store = createTestStore();

  // });
  // test("Your component with a full reducer flow", async () => {
  //   // Create a redux store
  //   render(<Login />);
  //   await screen.findByText("login");
  // });

  // it("renders the Login page", () => {
  //   render(<Login />);
  //   expect(screen.getByText(/login/i)).toBeInTheDocument();
  // });

  test("render 2 input components", () => {
    render(<Login />);
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  // it("renders a submit button", () => {
  //   render(<Login />);
  //   expect(screen.getByText(/Login/i)).toBeInTheDocument();
  // });
});

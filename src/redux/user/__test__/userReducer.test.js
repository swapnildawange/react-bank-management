import "@testing-library/jest-dom";
import { loginUserSuccess } from "../action";
import userReducer, { initialState } from "../userReducer";

describe("user Reducer", () => {
  it("return default state", () => {
    expect(userReducer(initialState, {})).toEqual(initialState);
  });

  it("handle login success", () => {
    const expectedRes = {
      isLoggedIn: true,
      isAuthenticated: true,
      isLoading: false,
      userInfo: {
        email: "vivek@gmail.com",
        firstName: "vivek",
      },
      error: "",
    };
    const res = {
      email: "vivek@gmail.com",
      firstName: "vivek",
    };
    expect(userReducer(initialState, loginUserSuccess(res))).toEqual({
      ...initialState,
      ...expectedRes,
    });
  });
});

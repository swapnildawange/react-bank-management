import { handleGetUsers } from "../handlers/users";

jest.mock("axios");

describe("get users saga", () => {
  const action = {
    token: "jwt token",
  };
  it("must be listening to get Users action", () => {
    const generator = handleGetUsers(action);
    console.log(generator.next(action).value.payload);
    // expect(generator.next().value.payload.args[0]).toBe(GET_USERS_INITIATE);
  });
});

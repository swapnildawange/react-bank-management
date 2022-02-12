import { GET_USERS_INITIATE } from "../../users/action.types";
import { handleGetUsers } from "../handlers/users";

jest.mock("axios");

const userData = {
  id: 2,
  email: "janet.weaver@reqres.in",
  first_name: "Janet",
  last_name: "Weaver",
  avatar: "https://reqres.in/img/faces/2-image.jpg",
};

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



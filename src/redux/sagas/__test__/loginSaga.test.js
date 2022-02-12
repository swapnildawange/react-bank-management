import { testSaga } from "redux-saga-test-plan";
import { loginUserSuccess } from "../../user/action";
import { handleLoginUser } from "../handlers/user";
import { requestLoginUser } from "../requests/user";

jest.mock("axios");

const userData = {
  id: 2,
  email: "janet.weaver@reqres.in",
  first_name: "Janet",
  last_name: "Weaver",
  avatar: "https://reqres.in/img/faces/2-image.jpg",
};

describe("login user saga", () => {
  const credentials = {
    payload: {
      email: "vivek@gmail.com",
      password: "vivek@123",
    },
  };
  it("must be listening to login action", () => {
    // const generator = handleLoginUser(credentials);
    const action = { type: "LOGIN_USER_INITIATE" };

    let saga = testSaga(handleLoginUser, credentials);
    // try path
    saga.next().call(requestLoginUser, credentials.payload);
    saga.next(action).put(loginUserSuccess, { id: "x" });
    saga.next();
    saga.next().isDone();
    // expect(generator.next().value.payload.args[0]).toHaveBeenCalled(
    // // );
    //   assert.deepEqual(
    //     gen.next().value,
    //     take(CHOOSE_COLOR),
    //     "it should wait for a user to choose a color"
    //   );
  });
});

// describe("fetchUser", () => {
//   const action = {
//     type: userActionConstants.USERS_DATA_INITIATE,
//     payload: {
//       userId: 2,
//     },
//   };
//   it("should fetch user details successfully", () => {
//     axios.get.mockImplementationOnce(() => Promise.resolve({ data: userData }));

//     return expectSaga(fetchUser, action).put(userDataSuccess(userData)).run();
//   });

//   it("should set error on failure of fetch user details", () => {
//     const error = new Error();
//     axios.get.mockImplementationOnce(() => Promise.reject(error));

//     return expectSaga(fetchUser, action).put(userDataFailure(error)).run();
//   });
// });

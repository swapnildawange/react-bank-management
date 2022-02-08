import { useSelector } from "react-redux";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar/ResponsiveAppBar";
import QuickAction from "./components/QuickAction/QuickAction";
import SignUp from "./components/SignUp/SignUp";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      {/* authentication */}
      {user?.isAuthenticated ? (
        <div className="flex justify-evenly items-center align-middle  min-h-screen">
          <img
            src="images/signup.svg"
            alt="signup"
            className="hidden  lg:block max-w-lg "
          />
          <SignUp />
        </div>
      ) : (
        <>
          <DisplayUsers/>
        </>
      )}
    </>
  );
}

export default App;

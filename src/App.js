import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import ResponsiveAppBar from "./components/AppBar/ResponsiveAppBar";
import Deposit from "./components/Deposit/Deposit";
import Details from "./components/Details/Details";
import History from "./components/History/History";
import Login from "./components/Login/Login";
import QuickAction from "./components/QuickAction/QuickAction";
import SignUp from "./components/SignUp/SignUp";
import UserDetails from "./components/UserDetails/UserDetails";
import Users from "./components/Users/Users";
import Withdraw from "./components/Withdraw/Withdraw";
import { loginUserSuccess } from "./redux/user/action";
import { getFromLocalStorage } from "./utils/setLocalStorage";
function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    let localUser = getFromLocalStorage("user");
    if (localUser?.token) {
      dispatch(loginUserSuccess(localUser));
    } else {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <ResponsiveAppBar />
      <Routes>
        {!user?.isLoggedIn ? (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
          </>
        ) : (
          <>
            {user?.userInfo.role === "Admin" ? (
              <>
                {/* admin routes */}
                <Route path="/users" element={<Users />} />
                <Route path="/users/:userID" element={<UserDetails />} />
                <Route path="/" element={<Users />} />
              </>
            ) : (
              <>
                {/* user routes */}
                <Route path="/" element={<QuickAction />} />
                <Route path="/withdraw" element={<Withdraw />} />
                <Route path="/deposit" element={<Deposit />} />
                <Route path="/history" element={<History />} />
                <Route path="/details" element={<Details />} />
              </>
            )}
          </>
        )}
        <Route path="*" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;

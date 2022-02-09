import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SignUp from "./components/SignUp/SignUp";
import UserDetails from "./components/UserDetails/UserDetails";
import Users from "./components/Users/Users";
import Sidebar from "./components/SideNav/Sidebar"
function App() {
  const user = useSelector((state) => state.user);
  return (
    <>
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:userID" element={<UserDetails />} />


      </Routes>
    </>
  );
}

export default App;

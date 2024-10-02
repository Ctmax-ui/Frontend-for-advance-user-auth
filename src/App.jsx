import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/HomePage";
import LoginPage from "./components/pages/LoginPage";
import CreateUserPage from "./components/pages/CreateUserPage";
import UserProfile from "./components/pages/UserProfile";
import NotFoundPage from "./components/pages/NotFoundPage";
import Logout from "./components/pages/Logout";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [hasAccess, setHasAccess]=useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const result = await axios.post(
          "http://localhost:3000/api/v1/userhasaccess",
          {accessToken:localStorage.getItem('accessToken')},
          { withCredentials: true }
        );
        console.log(result.data.access);
        setHasAccess(true)
      } catch (error) {
        console.log(error);
        setHasAccess(false)
      }
    };
    checkAccess();
    
  }, []);



  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage hasAccess={hasAccess} />} />

        <Route path="/logout" element={hasAccess?<Logout hasAccess={hasAccess} />:<Navigate to={"/"} />} />
        <Route path="/profile" element={hasAccess? <UserProfile hasAccess={hasAccess} />:<Navigate to={"/logout"}/>} />
        <Route path="*" element={hasAccess? <NotFoundPage />:<Navigate to={"/login"}/>} />

        <Route path="/createaccount" element={hasAccess? <Navigate to={"/"} /> : <CreateUserPage hasAccess={hasAccess} />} />
        <Route path="/login" element={hasAccess? <Navigate to={"/"} /> : <LoginPage hasAccess={hasAccess} />} />

      </Routes>
    </>
  );
}

export default App;

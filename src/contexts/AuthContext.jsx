import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthConst = createContext();

const AuthContext = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const register = async (userName, userEmail, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/createuser",
        { userName, userEmail, password },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      window.location.reload();
      console.log("register success");
      return response;
    } catch (error) {
      return error;
    }
  };

  // for login user
  const login = async (userEmail, password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/login",
        { userEmail: userEmail, password },
        { withCredentials: true }
      );
      localStorage.setItem("accessToken", response.data.accessToken);
      window.location.reload();
      console.log("login success");
      return response;
    } catch (error) {
      return error;
    }
  };

  // for logout user
  const logoutUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        localStorage.setItem("accessToken", "");

        console.log("logout success");
        window.location.reload();
        navigate("/login");
      }
    } catch (error) {
      // console.error('Error logging out:', error);
    }
  };

  // for genarating the new access token.
  const refreshSession = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/refreshtoken",
        {},
        { withCredentials: true }
      );
      console.log("refresh token updated and saved into localstorage");
      setUser(response.data.user);
      localStorage.setItem("accessToken", response.data.accessToken);
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // for the updating user

  const updateUser = async (userName, userEmail, password, updateToken) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/updateuser",
        {
          userName,
          userEmail,
          password,
          accessToken: localStorage.getItem("accessToken"),
          userUpdateToken: updateToken,
        },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  const getUpdateToken = async (password) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/userupdatetoken",
        { password, accessToken: localStorage.getItem("accessToken") },
        { withCredentials: true }
      );
      console.log(response);
      return response;
    } catch (error) {
      return error;
    }
  };

  // getting user details

  const getUser = async () => {
    try {
      const result = await axios.post(
        "http://localhost:3000/api/v1/getuser",
        { accessToken: localStorage.getItem("accessToken") },
        { withCredentials: true }
      );
      return result;
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    refreshSession();
    const intervalId = setInterval(() => {
      refreshSession();
    }, 60*1000*15); //15 min

    return () => clearInterval(intervalId);
  }, []);

  return (
    <AuthConst.Provider
      value={{
        user,
        login,
        logoutUser,
        register,
        getUpdateToken,
        updateUser,
        getUser,
      }}
    >
      {children}
    </AuthConst.Provider>
  );
};

export { AuthConst, AuthContext };

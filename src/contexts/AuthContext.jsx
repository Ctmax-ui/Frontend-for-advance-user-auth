import React, {createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthConst = createContext()

const AuthContext = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    // for login user
    const login = async (userEmail, password) => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/login",{ userEmail:userEmail, password },{ withCredentials: true });
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log('login success');
        window.location.reload()
        return response
      } catch (error) {
        return error
      }
    };


    // for logout user
    const logoutUser = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/logout', {}, { withCredentials: true });
        if (response.status === 200) {

          localStorage.setItem("accessToken","")

          console.log("logout success");
          window.location.reload()
          navigate('/login');

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
        console.log('refresh token updated and saved into localstorage');
        setUser(response.data.user);
        localStorage.setItem("accessToken", response.data.accessToken);
    } catch (error) {
        setUser(null);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
  refreshSession()
  const intervalId = setInterval(() => {
      refreshSession();
  }, 20000);

  return () => clearInterval(intervalId);
}, []);



  return (
    <AuthConst.Provider value={{user,login, logoutUser}}>
        {children}
    </AuthConst.Provider>
  )
}

export {AuthConst, AuthContext}
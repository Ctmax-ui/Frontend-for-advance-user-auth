import React, {createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthConst = createContext()

const AuthContext = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
  
    const login = async (userEmail, password) => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/login",{ userEmail:userEmail, password },{ withCredentials: true });
        localStorage.setItem("accessToken", response.data.accessToken);
        console.log('login success');
      } catch (error) {
        return error
      }
    };
  
    useEffect(() => {
        const refreshSession = async () => {
          try {
            const response = await axios.post(
              "http://localhost:3000/api/v1/refreshtoken",
              {},
              { withCredentials: true }
            );
            console.log('cookie to localstorage success');
            setUser(response.data.user);
            localStorage.setItem("accessToken", response.data.accessToken);
          } catch (error) {
            setUser(null);
          } finally {
            setLoading(false);
          }
        };
      refreshSession();
    }, []);




  return (
    <AuthConst.Provider value={{user,login}}>
        {children}
    </AuthConst.Provider>
  )
}

export {AuthConst, AuthContext}
import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col">
        <Link to="/logout" className="hover:text-red-500 my-2">logout</Link>
        <Link to="/profile" className="hover:text-red-500 my-2">profile</Link>
        <Link to="/login" className="hover:text-red-500 my-2">login</Link>
        <Link to="/createaccount" className="hover:text-red-500 my-2">create account</Link>
      </div>
    </>
  );
};

export default HomePage;

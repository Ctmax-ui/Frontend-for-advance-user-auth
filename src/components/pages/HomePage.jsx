import React from "react";
import { Link } from "react-router-dom";
import Header from "../reusable/Header";

const HomePage = ({hasAccess}) => {
  return (
    <>
      <Header hasAccess={hasAccess} />
    </>
  );
};

export default HomePage;

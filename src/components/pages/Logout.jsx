import{ useContext } from "react";
import { AuthConst } from "../../contexts/AuthContext";

const Logout = ({ hasAccess }) => {


  const { logoutUser } = useContext(AuthConst);
  logoutUser();

  return "";
};

export default Logout;

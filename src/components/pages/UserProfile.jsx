import Header from "../reusable/Header";
import { AuthConst } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";

const UserProfile = ({ hasAccess }) => {
  const { getUser } = useContext(AuthConst);
  const [fetchedData, setFetchedData] = useState(null);
  const fetchData = async () => {
    const result =await getUser();
    console.log(result);
  };

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <>
      <Header hasAccess={hasAccess} />
      <div className=" px-5 m-auto my-5">
        <p>Name: </p>
      </div>
    </>
  );
};

export default UserProfile;

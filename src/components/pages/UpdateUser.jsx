import React, { useContext, useRef, useState } from "react";
import { AuthConst } from "../../contexts/AuthContext";

const UpdateUser = () => {
  const { getUpdateToken, updateUser } = useContext(AuthConst);
  const [tokenGenPass, setTokenGenPass] = useState(""); // For single input reference

  const [fetchedUserData, setFetchedUserData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [updateToken, setUpdateToken] = useState("");

  const handleSubmitPass = async (e) => {
    e.preventDefault();
    try {
      console.log(tokenGenPass);
      const result = await getUpdateToken(tokenGenPass);
      console.log("User Data:", result.data.user);

      setUpdateToken(result.data.token);
      setFetchedUserData({
        ...fetchedUserData,
        userName: result.data.user.userName || "",
        email: result.data.user.email || "",
      });
    } catch (error) {
      console.log("Failed to generate update token:", error);
    }
  };

  const handleSubmitUpdatedUser = async (e) => {
    e.preventDefault();
    try {
      const result = await updateUser(
        fetchedUserData.userName,
        fetchedUserData.email,
        fetchedUserData.password,
        updateToken
      );
      console.log("Update Result:", result);
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  const handleUpdateInpChange = (e) => {
    const { name, value } = e.target;
    setFetchedUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center w-full h-screen">
      {updateToken ? (
        <form
          onSubmit={handleSubmitUpdatedUser}
          className="border w-1/2 flex flex-col gap-3 p-4"
        >
          <input
            type="text"
            className="border p-2"
            placeholder="Name"
            name="userName"
            onChange={handleUpdateInpChange}
            value={fetchedUserData.userName || ""}
          />
          <input
            type="email"
            className="border p-2"
            placeholder="Email"
            name="email"
            onChange={handleUpdateInpChange}
            value={fetchedUserData.email || ""}
          />
          <input
            type="password"
            className="border p-2"
            placeholder="Password"
            name="password"
            onChange={handleUpdateInpChange}
            value={fetchedUserData.password || ""}
          />
          <button type="submit" className="px-4 py-2 border">
            Update
          </button>
        </form>
      ) : (
        <form
          onSubmit={handleSubmitPass}
          className="border w-1/2 flex flex-col gap-3 p-4"
        >
          <input
            type="password"
            className="border p-2"
            placeholder="Enter your password"
            onChange={(e) => setTokenGenPass(e.target.value)}
          />
          <button type="submit" className="px-4 py-2 border">
            Submit
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateUser;

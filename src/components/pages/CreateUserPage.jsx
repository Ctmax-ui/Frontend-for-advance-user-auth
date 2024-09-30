import React, { useEffect, useRef, useState } from "react";
import { FaEye } from "react-icons/fa";
import dataUploader from "../../functions/dataUploader";
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from "react-router-dom";

const CreateUserPage = () => {
  const formInput = useRef();
  const [inputErr, setInputErr] = useState({ nameErr:"Name cannot be empty.", passErr:"Password cannot be empty.",emailErr:"Email cannot be empty."});
  const [grantAccess, setGrantAccess]= useState(false)

  const handleOnChange = () => {
    let userName = formInput.current[0].value;
    let userEmail = formInput.current[1].value;
    let password = formInput.current[2].value;

    let errors = { nameErr: null, passErr: null, emailErr: null };

    if (userName.length < 3) {
      errors.nameErr = "Name should be at least 3 characters.";
    }
  
    if (password.length < 4) {
      errors.passErr = "Password should be at least 4 characters.";
    }
  
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail.trim())) {
      errors.emailErr = "Please enter a correct Email.";
    }
  
    setInputErr(errors);
  
    if (errors.nameErr || errors.passErr || errors.emailErr) {
      
      return;
    }
    
    setGrantAccess(true)
  };

  const handleOnCreateSubmit = async (e) => {
    e.preventDefault();

    if(!grantAccess){
      return
    }

    const result = await dataUploader(
      "http://localhost:3000/api/v1/user",
      "POST",
      {
        userName: formInput.current[0].value,
        userEmail: formInput.current[1].value,
        password: formInput.current[2].value,
      }
    );

    console.log(result);
    if(result.message){
    
      toast.success(result.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      setGrantAccess(false)

      formInput.current[0].value = ""
      formInput.current[1].value = ""
      formInput.current[2].value = ""

      setInputErr({ nameErr:"Name cannot be empty.", passErr:"Password cannot be empty.",emailErr:"Email cannot be empty."})
    }
  };

  const showAndHidePassword = (e) => {
    let passwordInput = e.target.closest("div").children[0];
    passwordInput && passwordInput.type === "password"
      ? (passwordInput.type = "text")
      : (passwordInput.type = "password");
  };

  return (
    <>
<ToastContainer />

      <div className="font-[sans-serif] bg-gray-50 flex items-center md:h-screen p-4">
        <div className="w-full max-w-4xl max-md:max-w-xl mx-auto">
          <div className="bg-white grid md:grid-cols-2 gap-16 w-full sm:p-8 p-6 shadow-md rounded-md overflow-hidden">
            <div className="max-md:order-1 space-y-6">
              <div className="md:mb-16 mb-8">
                <h3 className="text-gray-800 text-2xl font-bold">
                  Instant Access
                </h3>
              </div>

              <div className="space-y-6">
                <button
                  type="button"
                  className="w-full px-5 py-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    fill="#fff"
                    className="inline shrink-0 mr-4"
                    viewBox="0 0 167.657 167.657"
                  >
                    <path
                      d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                      data-original="#010002"
                    />
                  </svg>
                  Continue with Facebook
                </button>
                <button
                  type="button"
                  className="w-full px-5 py-2.5 flex items-center justify-center rounded-md text-gray-800 text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    fill="#fff"
                    className="inline shrink-0 mr-4"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="#fbbd00"
                      d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                      data-original="#fbbd00"
                    />
                    <path
                      fill="#0f9d58"
                      d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                      data-original="#0f9d58"
                    />
                    <path
                      fill="#31aa52"
                      d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                      data-original="#31aa52"
                    />
                    <path
                      fill="#3c79e6"
                      d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                      data-original="#3c79e6"
                    />
                    <path
                      fill="#cf2d48"
                      d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                      data-original="#cf2d48"
                    />
                    <path
                      fill="#eb4132"
                      d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                      data-original="#eb4132"
                    />
                  </svg>
                  Continue with Google
                </button>
                <button
                  type="button"
                  className="w-full px-5 py-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-black hover:bg-[#333]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22px"
                    fill="#fff"
                    className="inline shrink-0 mr-4"
                    viewBox="0 0 22.773 22.773"
                  >
                    <path
                      d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                      data-original="#000000"
                    />
                  </svg>
                  Continue with Apple
                </button>
              </div>
            </div>

            <form
              className="w-full"
              onSubmit={handleOnCreateSubmit}
              ref={formInput}
            >
              <div className="mb-8">
                <h3 className="text-gray-800 text-2xl font-bold">Register</h3>
              </div>

              <div className="space-y-6">
                <div>
                  <label className={`text-gray-800 text-sm mb-2 block ${inputErr.nameErr? 'text-red-500':'text-gray-800 '}`}>
                    Name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="name"
                      type="text"
                      required
                      className={`bg-white border  w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500 ${
                        inputErr.nameErr
                          ? "outline-red-500 border-red-300"
                          : "outline-blue-500 border-gray-300"
                      }`}
                      placeholder="Enter name"
                      onChange={handleOnChange}
                    />
                  </div>
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {inputErr.nameErr ? inputErr.nameErr : ""}
                  </span>
                </div>
                <div>
                  <label className={`text-gray-800 text-sm mb-2 block ${inputErr.emailErr? 'text-red-500':'text-gray-800 '}`}>
                    Email Id
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      required
                      className={`bg-white border  w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500 ${
                        inputErr.emailErr
                          ? "outline-red-500 border-red-300"
                          : "outline-blue-500 border-gray-300"
                      }`}
                      placeholder="Enter email"
                      onChange={handleOnChange}
                    />
                  </div>
                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {inputErr.emailErr ? inputErr.emailErr : ""}
                  </span>
                </div>
                <div>
                  <label className={`text-sm mb-2 font-medium block ${inputErr.passErr? 'text-red-500':'text-gray-800 '}`}>
                    Password
                  </label>
                  <div className="relative flex items-center  password-form">
                    <input
                      name="password"
                      type="password"
                      required
                      className={`bg-white border w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md  ${
                        inputErr.passErr
                          ? "outline-red-500 border-red-300"
                          : "outline-blue-500 border-gray-300"
                      }`}
                      placeholder="Enter password"
                      onChange={handleOnChange}
                    />
                    <a
                      href="#"
                      onClick={showAndHidePassword}
                      className=" absolute right-0 text-slate-700 h-full flex justify-center items-center px-4 "
                    >
                      <FaEye />
                    </a>
                  </div>

                  <span className="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                    {inputErr.passErr? inputErr.passErr : ""}
                  </span>
                </div>
                {/* <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-md"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-gray-800 ml-3 block text-sm"
                  >
                    I accept the{" "}
                    <a
                      href="#"
                      className="text-blue-600 font-semibold hover:underline ml-1"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div> */}
              </div>

              <div className="!mt-8">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm tracking-wider font-semibold rounded-md bg-blue-600 hover:bg-blue-700 text-white focus:outline-none"
                >
                  Create Account
                </button>
              </div>
              <p className="text-gray-800 text-sm mt-6 text-center">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold hover:underline ml-1"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateUserPage;

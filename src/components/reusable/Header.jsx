import React from "react";
import { Link } from "react-router-dom";

const Header = ({hasAccess}) => {


  return (
    <>
      <header className="flex shadow-sm py-3 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
        <div className="flex flex-wrap items-center justify-between lg:gap-y-4 gap-y-6 gap-x-4 w-full">
          <Link to="/">
            <img
              src="https://readymadeui.com/readymadeui.svg"
              alt="logo"
              className="w-36"
            />
          </Link>

          <div
            id="collapseMenu"
            className="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-40 max-lg:before:inset-0 max-lg:before:z-50"
          >
            <button
              id="toggleClose"
              className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"
            >
              fdgsf
            </button>
          </div>

          <div className="flex items-center max-sm:ml-auto space-x-6">
            <ul>
              <li className="relative px-1 after:absolute after:bg-black after:w-full after:h-[2px] after:block after:top-8 after:left-0 after:transition-all after:duration-300">
                <button>gg</button>
                <div className="bg-white z-20 shadow-md py-6 px-6 sm:min-w-[320px] max-sm:min-w-[250px] absolute right-0 top-10 flex flex-col">
                  {hasAccess ? (
                    ""
                  ) : (
                    <>
                      <h6 className="font-semibold text-[15px]">Welcome</h6>
                      <p className="text-sm text-gray-500 mt-1">
                        To access account and manage orders
                      </p>
                    </>
                  )}
                  {hasAccess ? (<>
                    <Link
                      to="/profile"
                      className=" hover:bg-slate-50 py-1 px-2"
                    >
                      Profile
                    </Link>

                    <Link to={"/update"} className=" hover:bg-slate-50 py-1 px-2">
                    Update user
                    </Link>

                    <Link to={"/logout"} className=" hover:bg-slate-50 py-1 px-2">
                    Logout
                    </Link>

                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="bg-transparent border-2 border-gray-300 hover:border-black rounded px-4 py-2.5 mt-4 text-sm text-black font-semibold w-2/3"
                    >
                      LOGIN / SIGNUP
                    </Link>
                  )}
                </div>
              </li>
            </ul>

            <button id="toggleOpen" className="lg:hidden ml-7">
              |||
            </button>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;

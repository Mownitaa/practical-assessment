"use client";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import React, { useState } from "react";

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <nav className="fixed z-50 w-full bg-white md:absolute md:bg-transparent">
      <div className="container m-auto px-2 md:px-12 lg:px-7">
        <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
          <input
            type="checkbox"
            name="toggle_nav"
            id="toggle_nav"
            className="peer hidden"
          />
          <div className="w-full px-6 flex justify-between lg:w-max md:px-0">
            <Link
              href="/"
              aria-label="logo"
              className="flex space-x-2 items-center"
            >
              <span className="text-2xl font-bold text-yellow-900 ">
                Tailus <span className="text-yellow-700 ">Feedus</span>
              </span>
            </Link>

            <div className="flex items-center lg:hidden max-h-10">
              <label
                role="button"
                htmlFor="toggle_nav"
                aria-label="hamburger"
                id="hamburger"
                className="relative w-10 h-auto p-2"
              >
                <div
                  id="line"
                  className="m-auto h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                ></div>
                <div
                  id="line2"
                  className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                ></div>
              </label>
            </div>
          </div>

          <label
            role="button"
            htmlFor="toggle_nav"
            className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200  bg-opacity-30 "
          ></label>
          {!isDrawerOpen && (
            <div className="hidden peer-checked:flex w-full flex-col lg:flex lg:flex-row justify-end z-10 items-center gap-y-6 p-6 rounded-xl bg-white lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
              <div className="text-gray-600 lg:pr-4 w-full">
                <ul className="tracking-wide font-medium text-sm flex flex-col gap-y-6 lg:gap-y-0 lg:flex-row w-full">
                  <li>
                    <Link
                      href="/all-recipes"
                      className="block md:px-4 transition hover:text-yellow-700"
                    >
                      <span>All recipes</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/cart"
                      className="block md:px-4 transition hover:text-yellow-700"
                    >
                      <span>Cart</span>
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="w-full flex justify-center min-w-max border-yellow-200 lg:space-y-0 sm:w-max lg:border-l">
                <Link href="/sign-up">
                  <button
                    type="button"
                    title="Sign up"
                    className="w-full py-3 px-6 text-center rounded-full transition active:bg-yellow-200   focus:bg-yellow-100 sm:w-max"
                  >
                    <span className="block text-yellow-800 font-semibold text-sm">
                      Sign up
                    </span>
                  </button>
                </Link>
                {user ? (
                  <button
                    onClick={toggleDrawer}
                    type="button"
                    title="user icon"
                    className="p-3 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-5 block text-yellow-900 font-semibold text-sm"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                  </button>
                ) : (
                  <Link href="/login">
                    <button
                      type="button"
                      title="login"
                      className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                    >
                      <span className="block text-yellow-900 font-semibold text-sm">
                        Login
                      </span>
                    </button>
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Drawer Overlay */}
      <div>
        {isDrawerOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50"
            onClick={toggleDrawer}
          ></div>
        )}

        {/* Drawer */}
        <div
          className={`fixed right-0 top-0 w-auto md:w-1/4 h-full bg-white transform ${
            isDrawerOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300`}
        >
          <div className="p-4">
            {user && (
              <>
                <h2 className="text-lg text-yellow-900 font-bold">
                  {user.username}
                </h2>
                <p className="text-gray-700">{user.email}</p>
                <Link href="/cart">
                  <button className="block text-yellow-900 font-semibold w-full mt-8 py-2 px-4 rounded bg-yellow-50 hover:bg-yellow-200">
                    My Cart
                  </button>
                </Link>
                <button
                  onClick={logout}
                  type="button"
                  title="Start buying"
                  className="block text-yellow-900 font-semibold w-full mt-4 py-2 px-4 rounded bg-yellow-300 hover:bg-yellow-200"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

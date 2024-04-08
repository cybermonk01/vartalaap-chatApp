import React from "react";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((store) => store.auth.user);

  return (
    <header className="p-4 bg-green-500 dark:bg-green-700">
      <div className="container flex justify-between h-16 mx-auto">
        <div className="flex">
          <a
            rel="noopener noreferrer"
            href="#"
            aria-label="Back to homepage"
            className="flex items-center p-2"
          >
            <img
              src="https://i.ibb.co/6ryyHsw/049950546172.jpg"
              alt="049950546172"
              border="0"
              className="w-20"
            />
          </a>
        </div>

        <div className="items-center flex-shrink-0 hidden lg:flex">
          {user ? (
            <a href="/login">
              <button className="px-8 py-3 font-semibold rounded dark:bg-gray-50 dark:text-gray-600">
                Log out
              </button>
            </a>
          ) : (
            <a href="/login">
              <button className="px-8 py-3 font-semibold rounded dark:bg-gray-50 dark:text-gray-600">
                Log in
              </button>
            </a>
          )}
        </div>

        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 dark:text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default Header;

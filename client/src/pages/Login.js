import React, { useRef } from "react";
import { toast } from "react-toastify";
import axiosReq from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/authSlice";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleDemoLogin = (e) => {
    e.preventDefault();
    const demoEmail = "userC@chat.com";
    const demoPassword = "123456";

    email.current.value = demoEmail;
    password.current.value = demoPassword;
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    const userData = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const response = await axiosReq.post("/user/login", userData);

      const { data } = response;

      const userInfo = data?.data?.user;

      const accessToken = data?.data?.accessToken;

      dispatch(addUser(userInfo));

      localStorage.setItem("accessToken", accessToken);
      console.log(accessToken);

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      console.error("Error logging in:", error);
      toast.error("Error logging in. Please check your credentials.");
    }
  };

  return (
    <div>
      <section className="bg-white dark:bg-gray-900">
        <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
          <form className="w-full max-w-md">
            <img
              className="w-auto h-7 sm:h-8"
              src="https://merakiui.com/images/logo.svg"
              alt=""
            />

            <h1 className="mt-3 text-2xl font-semibold text-gray-800 capitalize sm:text-3xl dark:text-white">
              Sign In
            </h1>

            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="text"
                ref={email}
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="email"
              />
            </div>
            <div className="relative flex items-center mt-8">
              <span className="absolute">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <input
                type="password"
                ref={password}
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
              />
            </div>

            <div className="mt-6">
              <button
                onClick={handleLogin}
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
              >
                Sign in
              </button>
              <button
                onClick={handleDemoLogin}
                className="w-full px-6 py-3 my-5 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-green-500 rounded-lg hover:bg-green-400 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-50"
              >
                Guest User credentials
              </button>

              <div className="mt-6 text-center ">
                <a
                  href="#"
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Don’t have an account yet?
                  <a href="/register">Sign up</a>
                </a>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;

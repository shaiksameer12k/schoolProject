import React from "react";
import { Button } from "antd";
// import 'antd/dist/antd.css';  // Import Ant Design styles
// import './LoginComponent.css'; // You can create a custom CSS file if needed

const LoginComponent = () => {
  return (
    <div
      className="bg-gray-100 min-h-screen flex items-center justify-center"
      id="loginScreen"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-xl:m-2">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Your School Name
          </h2>
          <p className="text-gray-500">Login to your account</p>
        </div>

        <form action="#" method="POST">
          {/* Username Field */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Login Button */}
          <div className="mb-4">
            <Button type="primary" className="w-full py-2 text-lg rounded-md">
              Login
            </Button>
          </div>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a href="#" className="text-blue-500 text-sm hover:underline">
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginComponent;

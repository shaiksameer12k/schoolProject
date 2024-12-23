import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import ButtonComponent from "../../reusable/Button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import InputField from "../../reusable/InputField/InputField";
import { MailOutlined, SecurityScanOutlined } from "@ant-design/icons";
// import 'antd/dist/antd.css';  // Import Ant Design styles
// import './LoginComponent.css'; // You can create a custom CSS file if needed

const UserLoginComponent = () => {
  let navigate = useNavigate();
  const loginHandel = () => {
    navigate("/layout");
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Check if user credentials are already saved in localStorage
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save credentials in localStorage if 'Remember Me' is checked
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // Remove credentials from localStorage if 'Remember Me' is not checked
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    // Here you can perform the login logic (API call, etc.)

    console.log("Logged in:", { email, password });
    message.success("SuccessFully Login");
    navigate("/StudentLayout");
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  return (
    <div
      className="bg-gray-100 min-h-screen flex items-center justify-center"
      id="loginScreen"
    >
      <div className="shape01"></div>
      <div className="shape03"></div>

      <div className=" w-full max-w-md max-xl:m-2" id="loginFormContainer">
        <div
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md max-xl:m-2 z-1"
          id="loginForm"
        >
          <div className="text-start mb-6">
            <h2 className="text-3xl font-semibold text-primaryTextColor">
             Student Sign In
            </h2>
          </div>

          <form action="#" method="POST">
            {/* Username Field */}
            <div className="mb-4"></div>
            <div className="mb-4">
              <InputField
                type="text"
                // label="username"
                name="username"
                id="inputField"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                isError={""}
                isFieldVisible={true}
                layout={"vertical"}
                placeholder="User Name"
                prefix={<MailOutlined />}
                style={{ padding: 0 }}
                variant="boderless"
                size="large"
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <InputField
                type="password"
                // label="Password"
                name="password"
                id="inputField"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                isError={""}
                isFieldVisible={true}
                layout={"vertical"}
                placeholder="Password"
                prefix={<SecurityScanOutlined />}
                style={{ padding: 0 }}
                variant="boderless"
                size="large"
              />
            </div>
            <div>
              <InputField
                type="checkbox"
                label="Remember Me"
                name="rememberMe"
                checked={rememberMe}
                value={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                isError={""}
                isFieldVisible={true}
                layout={"vertical"}
                style={{ padding: 0 }}
                isMandatory={false}
              />
            </div>

            {/* Login Button */}
            <div className="mb-4">
              {/* <Button type="primary" className="w-full py-2 text-lg rounded-md">
              
            </Button> */}
              <ButtonComponent
                name="Login"
                type="primary"
                onClick={handleSubmit}
                size="large"
                btnStyle={{ width: "100%" }}
              />
            </div>

            {/* Forgot Password Link */}
            <div className="text-center">
              <a href="#" className="text-blue-500 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
        <div className="shape02"></div>
      </div>
    </div>
  );
};

export default UserLoginComponent;

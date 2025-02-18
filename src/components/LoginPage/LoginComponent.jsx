import React, { useEffect, useState } from "react";
import { Button, message } from "antd";
import ButtonComponent from "../../reusable/Button/ButtonComponent";
import { useNavigate } from "react-router-dom";
import InputField from "../../reusable/InputField/InputField";
import { MailOutlined, SecurityScanOutlined } from "@ant-design/icons";
import { useApiCalls } from "../../api/apiCalls";
import { generateToken } from "../../api/generateToken";
// import 'antd/dist/antd.css';  // Import Ant Design styles
// import './LoginComponent.css'; // You can create a custom CSS file if needed

const LoginComponent = () => {
  let navigate = useNavigate();
  let { ApiCalls, loadingStates } = useApiCalls();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [submitButtonLoaderState, setSubmitButtonLoaderState] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitButtonLoaderState(true);
    loadingStates.handleSubmit = true;
    console.log("inner handleSubmit ", loadingStates);
    let token = await generateToken();
    // Save credentials in localStorage if 'Remember Me' is checked
    if (rememberMe) {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
    } else {
      // Remove credentials from localStorage if 'Remember Me' is not checked
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }

    if (!email) {
      return message.error("Please Fill UserName ");
    }

    if (!password) {
      return message.error("Please Fill Password ");
    }

    if (!token) {
      return message.error("Unauthorized");
    }

    // Here you can perform the login logic (API call, etc.)
    try {
      let params = JSON.stringify([{ UserName: email, Password: password }]);
      let result = await ApiCalls(
        "handleSubmit",
        "post",
        "Admin/AdminLogin",
        params
      );
      console.log("handleSubmit", result);

      if (result[0]?.Status > 0) {
        let { Message, data , Menulists } = result[0];
        localStorage.setItem("loginUserData", JSON.stringify(data));
        localStorage.setItem("Menulists", JSON.stringify(Menulists));
        navigate("/layout");
        return message.success(Message);
      }
      setSubmitButtonLoaderState(false);
      loadingStates.handleSubmit = false;
    } catch (error) {
      console.log(`Error Admin/AdminLogin : ${error}`);
    } finally {
      setSubmitButtonLoaderState(false);
      loadingStates.handleSubmit = false;
    }
  };

  const handleRememberMeChange = (e) => {
    setRememberMe(e.target.checked);
  };

  console.log("loadingStates", loadingStates);

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
              Admin Sign In
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
              <ButtonComponent
                name="Login"
                type="primary"
                onClick={handleSubmit}
                size="large"
                btnStyle={{ width: "100%" }}
                loading={submitButtonLoaderState}
                disabled={submitButtonLoaderState}
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

export default LoginComponent;

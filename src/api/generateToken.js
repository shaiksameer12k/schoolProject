import axios from "axios";
import { env } from "../utils/constant";

export const generateToken = async () => {
  console.log(
    env.VITE_API_URL,
    env.VITE_APP_AUTH_API_USERNAME,
    env.VITE_APP_AUTH_API_PASSWORD
  );
  try {
    let url = `${env.VITE_API_URL}api/Login`;

    let headers = {
      mode: "no-core",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    let params = JSON.stringify({
      UserName: env.VITE_APP_AUTH_API_USERNAME,
      Password: env.VITE_APP_AUTH_API_PASSWORD,
    });

    let result = await axios.post(url, params, headers);
    result = await result.data;
    console.log("generateToken", result, params);

    if (result.Token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${result.Token}`;
      localStorage.setItem("token", result.Token);
    }
    return result.Token;
  } catch (error) {
    return error;
  }
};

const setTokenInAxios = async () => {
  axios.defaults.headers;
};

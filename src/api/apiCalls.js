import axios from "axios";

import { ApiHeaders } from "./apiHeader";

import { useCallback, useState } from "react";
import { message } from "antd";
import { env } from "../utils/constant";

export const useApiCalls = () => {
  const [loadingStates, setLoadingStates] = useState({});

  const setLoading = useCallback((key, value) => {
    setLoadingStates((prev) => ({ ...prev, [key]: value }));
  }, []);

  async function ApiCalls(
    functionName = "dummy",
    type = "get",
    route,
    params,
    token
  ) {
    console.log("ApiCalls", functionName, type, route, params, token);
    try {
      setLoading(functionName, true);
      let url = `${env.VITE_API_URL}${route}`;
      let result;

      type != "get"
        ? (result = await axios[type](url, params, ApiHeaders(type, token)))
        : (result = await axios[type](url, ApiHeaders(type, token)));

      result = await result.data;

      if (result.length > 0) {
        let { Status, Message, isToastAvailable, data = [] } = result[0];
        console.log("Status", Status, isToastAvailable, Message);
        isToastAvailable == 1 &&
          message[Status == 1 ? "success" : "error"](Message);
      }
      return result;
    } catch (error) {
      console.log(`${route} : ${error}`);
    } finally {
      setLoading(functionName, false);
    }
  }

  return { ApiCalls, loadingStates };
};

/*
result schema from api
[{
 Status:0 / 1, status 1 success, status 0 error
 Message:"",
 isToastAvalable:0 / 1,  toast 1 show messae in toast , toast 0 not to show
 data:[],
}]
 */

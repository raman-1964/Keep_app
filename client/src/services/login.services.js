import axios from "axios";
import authHeader from "./auth-header";
const BASE_URL = "http://localhost:5678/api";

export const loginRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/login", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const signupRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/auth/register", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

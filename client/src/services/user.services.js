import axios from "axios";
import authHeader from "./auth-header";
const BASE_URL = process.env.REACT_APP_URL;

export const userInfoRequestApi = async (data) => {
  try {
    const res = await axios.get(BASE_URL + "/user/me", {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const updateUserInfoRequestApi = async (data) => {
  try {
    const res = await axios.put(BASE_URL + "/user", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const deleteUserRequestApi = async (data) => {
  try {
    const res = await axios.delete(BASE_URL + "/user", {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const changePasswordRequestApi = async (data) => {
  try {
    const res = await axios.put(BASE_URL + "/user/change-password", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};
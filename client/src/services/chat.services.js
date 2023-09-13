import axios from "axios";
import authHeader from "./auth-header";
const BASE_URL = process.env.REACT_APP_URL;

export const getAllChatRequestApi = async (data) => {
  try {
    const res = await axios.get(BASE_URL + "/chat", {
      headers: { ...authHeader() },
      params: { ...data },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const createChatRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/chat/create", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

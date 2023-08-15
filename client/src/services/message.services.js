import axios from "axios";
import authHeader from "./auth-header";
const BASE_URL = process.env.REACT_APP_URL;

export const getAllMessageRequestApi = async (data) => {
  try {
    const res = await axios.get(BASE_URL + "/message", {
      headers: { ...authHeader() },
      params: { ...data },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const createMessageRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/message", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const getAllUnseenMessageRequestApi = async () => {
  try {
    const res = await axios.get(BASE_URL + "/message/unseen", {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const seenedMessageRequestApi = async (data) => {
  try {
    const res = await axios.put(BASE_URL + "/message/seen", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

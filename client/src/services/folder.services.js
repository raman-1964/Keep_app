import axios from "axios";
import authHeader from "./auth-header";
const BASE_URL = process.env.REACT_APP_URL;

export const getAllFolderRequestApi = async (data) => {
  try {
    const res = await axios.get(BASE_URL + "/folder", {
      headers: { ...authHeader() },
      params: data,
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const createFolderRequestApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/folder", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const deleteFolderRequestApi = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + "/folder/" + id, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const shareFolderRequestApi = async (data) => {
  try {
    const res = await axios.put(BASE_URL + "/folder", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

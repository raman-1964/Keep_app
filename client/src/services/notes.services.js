import axios from "axios";
import authHeader from "./auth-header";
const BASE_URL = process.env.REACT_APP_URL;

export const getNoteApi = async (data) => {
  try {
    const res = await axios.get(BASE_URL + "/note", {
      headers: { ...authHeader() },
      params: { ...data },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const getLikeNoteApi = async (data) => {
  try {
    const res = await axios.get(BASE_URL + "/note/like", {
      headers: { ...authHeader() },
      params: { ...data },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const addNoteApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/note", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const updateNoteApi = async (data) => {
  try {
    const res = await axios.put(BASE_URL + "/note/" + data.id, data.note, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const deleteNoteApi = async (id) => {
  try {
    const res = await axios.delete(BASE_URL + "/note/" + id, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const likeNoteApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/note/add-like", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const unlikeNoteApi = async (data) => {
  try {
    const res = await axios.post(BASE_URL + "/note/remove-like", data, {
      headers: { ...authHeader() },
    });
    return res.data;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

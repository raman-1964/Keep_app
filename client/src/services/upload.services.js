import axios from "axios";
import authHeader from "./auth-header";
const BASE_URL = process.env.REACT_APP_URL;
const CLOUD_URL = process.env.REACT_APP_CLOUD_URL;
const api_key = process.env.REACT_APP_CLOUD_API_KEY;

export const uploadFile = async (bucket, file, userId) => {
  try {
    const signatureData = await axios.post(
      BASE_URL + "/upload",
      { folder: bucket, userId },
      { headers: { ...authHeader() } }
    );

    const { timestamp, signature } = signatureData.data;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", api_key);
    formData.append("signature", signature);
    formData.append("timestamp", timestamp);
    formData.append("folder", bucket);
    formData.append("public_id", userId);

    // formData.append("upload_preset", "userImage");

    const image = await axios.post(CLOUD_URL + "upload", formData);

    return image.data.secure_url;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

export const deleteFile = async (userId) => {
  try {
    const signatureData = await axios.post(
      BASE_URL + "/upload",
      { userId },
      { headers: { ...authHeader() } }
    );

    const { timestamp, signature } = signatureData.data;

    const response = await axios.post(CLOUD_URL + "destroy", {
      public_id: userId,
      signature,
      api_key,
      timestamp,
    });

    return response;
  } catch (e) {
    throw Error(e.response?.data?.msg ?? "Something went wrong");
  }
};

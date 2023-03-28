import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const upLoadImage = (data) => API.post("/upload", data);
export const upLoadPost = (data) => API.post("/posts", data);

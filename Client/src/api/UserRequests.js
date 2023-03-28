import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const getOneUser = (userId) => API.get(`/user/${userId}`);
export const getAllUser = () => API.get(`/user`);
export const updateUser = (id, formData) => API.put(`/user/${id}`, formData);
export const followerUser = (id, Data) => API.put(`/user/${id}/follow`, Data);
export const unFollowerUser = (id, Data) =>
  API.put(`/user/${id}/unfollow`, Data);

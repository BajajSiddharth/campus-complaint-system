import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000"
});

export const authApi = axios.create({
  baseURL: "http://localhost:4000"
});

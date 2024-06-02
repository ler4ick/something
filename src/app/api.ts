import axios from "axios";

export const defaultApi = axios.create({
  baseURL: "/base",
  headers: {
    'Content-Type': "application/json"
  }
})


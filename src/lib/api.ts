import axios from "axios";

const token = process.env.NEXT_PUBLIC_BEARER_TOKEN;

export const instance = axios.create({
  baseURL: "https://uhohbe-2bcc378a9bba.herokuapp.com",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

import axios from "axios";

export const baseURL = "https://boodong.app/api/v2";

export const PublicInstance = axios.create({
  baseURL,
});

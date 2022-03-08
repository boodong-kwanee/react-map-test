import axios from "axios";

export const baseURL = "https://boodong.app/api/v2/review";

export const PublicInstance = axios.create({
  baseURL,
});

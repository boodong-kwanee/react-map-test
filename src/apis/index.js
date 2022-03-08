import axios from "axios";

export const baseURL = "https://boodong.app/api/v2/live";

export const PublicInstance = axios.create({
  baseURL,
});

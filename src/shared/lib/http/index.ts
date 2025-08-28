import axios from "axios";
import { API_BASE_URL } from "../../config";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10_000,
});

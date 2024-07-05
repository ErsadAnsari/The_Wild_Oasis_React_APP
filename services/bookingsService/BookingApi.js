import axios from "axios";
import { baseURL } from "../Base_Url/apiBaseUrl";
const BASE_URL = baseURL;
export const ENDPOINT = {
  GETBOOKINGS: "GetBookings",
};
export const createAPIEndpoint = (endpoint) => {
  let url = `${BASE_URL}Settings/${endpoint}`;
  return {
    fetchAll: () => axios.get(url),

  };
};

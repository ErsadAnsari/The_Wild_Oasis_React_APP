import axios from "axios";
import { baseURL } from "../Base_Url/apiBaseUrl";
const BASE_URL = baseURL;
export const ENDPOINT = { GETSETTINGS: "GetAllSettings",UPDATESETTINGS:"UpdateSettings"};
export const createAPIEndpoint = (endpoint) => {
  let url = `${BASE_URL}Settings/${endpoint}`;
  return {
    fetchAll: () => axios.get(url),
    updatesettings:(data)=>axios.post(url,data),
    // deleteById: (id) => axios.get(`${url}?id=${id}`),
    // addCabin: (data) => axios.post(url, data),
    // updatecabin: (data) => axios.post(url, data),
  };
};
import axios from "axios";
import { baseURL } from "../Base_Url/apiBaseUrl";
const BASE_URL = baseURL;
export const ENDPOINT = {
  GETALLCABINS: "GetAllCabins",
  DELETECABIN: "DeleteCabinById",
  ADDCABIN: "AddCabin",
  UPDATECABIN:"UpdateCabin",
};
export const createAPIEndpoint = (endpoint) => {
  let url = `${BASE_URL}Cabin/${endpoint}`;
  return {
    fetchAll: () => axios.get(url),
    deleteById: (id) => axios.get(`${url}?id=${id}`),
    addCabin: (data) => axios.post(url,data),
    updatecabin:(data)=>axios.post(url,data),

  };
};

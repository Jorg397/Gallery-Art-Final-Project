import axios from "axios";

const apiUrl = import.meta.env.VITE_URL_API;
//const apiUrl = "https://15.228.78.162:3001/";
export const createCustomer = async (customer) => {
  const { email, password } = customer;
  let data2;
  let url = `${apiUrl}customer/create`;
  return await axios.post(url, { email, password });
};

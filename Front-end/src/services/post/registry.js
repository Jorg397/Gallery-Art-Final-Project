import axios from "axios";

const apiUrl = import.meta.env.VITE_URL_API;

export const createCustomer = async (customer) => {
  const { email, password } = customer;

  let url = `${apiUrl}/customer/create`;
  return await axios.post(url, { email, password });
};

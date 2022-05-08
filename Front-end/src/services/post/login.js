import axios from "axios";

const apiUrl = import.meta.env.VITE_URL_API;

export const login = async (customer) => {
  console.log({ customer });
  const { email, password } = customer;
  let url = `${apiUrl}/customer/login`;
  return await axios.post(url, { email, password });
};

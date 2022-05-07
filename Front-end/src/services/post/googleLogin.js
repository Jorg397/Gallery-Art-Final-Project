import axios from "axios";

export const googlelogin = async (customer) => {
  const { email, name, googleId } = customer;
  const password = googleId;
  let url = `${import.meta.env.VITE_URL_API}/customer/googlelogin`;
  return await axios.post(url, { email, name, password });
};

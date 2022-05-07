import Api from "../../interceptors/base";

export const putProfile = async (customer, id) => {
  console.log("putProfile hagi", id);
  let url = `/customer/${id}`;
  return await Api.put(url, { ...customer });
};

import Api from "../../interceptors/base";

const apiUrl = "http://localhost:3001/";
//const apiUrl = "https://15.228.78.162:3001/";
export const putProfile = async (customer,id) => {
    let url = `/customer/${id}`;
    return await Api.put(url, {...customer})
        
}
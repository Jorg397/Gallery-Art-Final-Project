import axios from "axios";

const apiUrl = "http://localhost:3001/";
//const apiUrl = "https://15.228.78.162:3001/";
export const login = async (customer) => {
    console.log( {customer});
    const {email,password} = customer;
    let url = `${apiUrl}customer/login`;
    return await axios.post(url, {email,password})
        
}
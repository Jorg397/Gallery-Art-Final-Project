import axios from "axios";

export const login = async (customer) => {
    console.log( {customer});
    const {email,password} = customer;
    let url = `http://localhost:3001/customer/login`;
    return await axios.post(url, {email,password})
        
}
import axios from "axios";

export const createCustomer = async (customer) => {
    const {email,password} = customer;
    let data2;
    let url = "http://localhost:3001/customer/create";
    return await axios.post(url, {email,password})
        
}
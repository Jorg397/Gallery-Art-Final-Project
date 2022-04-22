import axios from "axios";

export const googlelogin = async (customer) => {
    console.log( {customer});
    const {email,name, googleId} = customer;
    const password= googleId
    let url = `http://localhost:3001/customer/googlelogin`;
    return await axios.post(url, {email,name, password})
        
}

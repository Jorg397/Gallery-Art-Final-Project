export const validationsFields = () => {
    const regexField ={
        email:{
            regex:/^\S[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
            message:"El email no es valido"
        },
        password:{
            regex:/(\S|\.){5,}/,
            message:"La contraseña debe tener al menos 5 caracteres"
        }
    }

    const validateField = (field,value) =>{
        const regex = regexField[field].regex;
        const message = regexField[field].message;
        if(regex.test(value)){
            return {status:false,message:""}
        }else{
            return {status:true,message:message}
        }
    }

    const email = (value) => {
        return validateField("email",value);
    }

    const password = (value) => {
        return validateField("password",value);
    }

    const repeatPassword = (value,password) => {
        if(value === password){
            return {status:false,message:""}
        }else{
            return {status:true,message:"Las contraseñas no coinciden"}
        }
    }

    return {email,password,repeatPassword};
}
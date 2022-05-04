export const validationsFields = () => {
  const regexField = {
    email: {
      regex: /^\S[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
      message: "El email no es valido",
    },
    password: {
      regex: /(\S|\.){5,}/,
      message: "La contraseña debe tener al menos 5 caracteres",
    },
    name: {
      regex: /^([a-zA-Z]|\S){1,}/,
      message:
        "El espacio no debe estar vacio o debe tener 3 caracteres minimo",
    },
    lastName: {
      regex: /^([a-zA-Z]|\S){1,}/,
      message:
        "El espacio no debe estar vacio o debe tener 3 caracteres minimo",
    },
    phone: {
      regex: /^\d{9,11}$/,
      message: "El telefono debe tener 9 o 11 digitos",
    },
    dni: {
      regex: /^\d{8}$/,
      message: "El dni debe tener 8 digitos",
    },
  };

  const validateField = (field, value) => {
    const regex = regexField[field].regex;
    const message = regexField[field].message;
    console.log("valited phone test", value, " ", field);
    if (regex.test(value)) {
      console.log("valited phone test 1");
      return { status: false, message: "" };
    } else {
      console.log("valited phone test x");
      return { status: true, message: message };
    }
  };

  const email = (value) => {
    return validateField("email", value);
  };

  const password = (value) => {
    return validateField("password", value);
  };

  const repeatPassword = (value, password) => {
    if (value === password) {
      return { status: false, message: "" };
    } else {
      return { status: true, message: "Las contraseñas no coinciden" };
    }
  };

  const name = (value) => {
    return validateField("name", value);
  };

  const lastName = (value) => {
    return validateField("lastName", value);
  };

  const phone = (value) => {
    console.log("valited phone", value);
    return validateField("phone", value);
  };

  const dni = (value) => {
    return validateField("dni", value);
  };

  return { email, password, repeatPassword, name, lastName, phone, dni };
};

import { useCallback, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { StepperContext } from "../../contexts/StepperContext";
import css from "./style.module.css";

function Account() {
  const { userData, setUserData, validate, errors, setErrors } =
    useContext(StepperContext);
  console.log("RENDER");

  console.log(errors);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });

    if (validate(name, { ...userData, [name]: value })) {
      setErrors({
        ...errors,
        [name]: {
          validity: true,
          msg: errors[name].msg,
        },
      });
    } else {
      setErrors({
        ...errors,
        [name]: {
          validity: false,
          msg: errors[name].msg,
        },
      });
    }
  };

  /* const loadDataOnlyOnce = useCallback(() => {
    //console.log("I need ", userData);
    //console.log(Object.keys(userData)[1]);
    const test = errors[Object.keys(userData)[1]];
    let inputs = Object.keys(userData)[1];
    //console.log(inputs);
    //Si seteo el estado directamente si toma el cambio si intento hace n ciclo no lo guarda
    setErrors({
      ...errors,
      [inputs]: {
        ...errors[inputs],
        validity: true,
      },
    });
    //console.log(userData);
        Object.keys(userData).forEach((input) => {
      if (validate(input, userData)) {
        console.log("Antes: ", errors);
        setErrors({
          ...errors,
          [input]: {
            validity: true,
            msg: errors[input].msg,
          },
        });
        console.log("Despues: ", errors);
      } else {
        setErrors({
          ...errors,
          [input]: {
            validity: true,
            msg: errors[input].msg,
          },
        });
      }
    });
  }, [userData]); */

  /*  useEffect(() => {
    loadDataOnlyOnce();
  }, [loadDataOnlyOnce]); */

  return (
    <div className="grid grid-cols-2 ">
      <div className="flex col-span-2 justify-center font-bold text-white text-2xl">
        Completa Tus Datos:
      </div>
      <div className="mx-2 w-full flex-1 px-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Nombre
        </div>
        <div
          className={`my-2 flex rounded border border-gray-200 bg-white p-1  ${
            !errors.name.validity ? css.err : undefined
          }`}
        >
          <input
            onChange={handleChange}
            required
            value={userData["name"] || ""}
            name="name"
            placeholder="nombre"
            className={`w-full appearance-none p-1 px-2 text-gray-800 outline-none`}
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1 px-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Apellidos
        </div>
        <div
          className={`my-2 flex rounded border border-gray-200 bg-white p-1 ${
            !errors.lastName.validity ? css.err : undefined
          }`}
        >
          <input
            onChange={handleChange}
            value={userData["lastName"] || ""}
            name="lastName"
            placeholder="apellidos"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1 px-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          DNI
        </div>
        <div
          className={`my-2 flex rounded border border-gray-200 bg-white p-1 ${
            !errors.dni.validity ? css.err : undefined
          }`}
        >
          <input
            onChange={handleChange}
            value={userData["dni"] || ""}
            name="dni"
            placeholder="dni"
            type="number"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1 px-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Telefono
        </div>
        <div
          className={`my-2 flex rounded border border-gray-200 bg-white p-1 ${
            !errors.phone.validity ? css.err : undefined
          }`}
        >
          <input
            onChange={handleChange}
            value={userData["phone"] || ""}
            name="phone"
            placeholder="telefono"
            type="number"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1 px-1 col-span-2">
        <div className="flex mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500 justify-evenly items-center">
          Quiero recibir ofertas y novedades por email
          <input
            onChange={handleChange}
            value={userData["apellidos"] || ""}
            name="apellidos"
            placeholder="apellidos"
            type="checkbox"
            className=""
          />
        </div>
      </div>
    </div>
  );
}

export default Account;

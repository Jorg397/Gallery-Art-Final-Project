import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";

export default function Account() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <div className="grid grid-cols-2 ">
      <div className="flex col-span-2 justify-center font-bold text-white text-2xl">
        Completa Tus Datos:
      </div>
      <div className="mx-2 w-full flex-1 px-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Nombre
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["nombre"] || ""}
            name="nombre"
            placeholder="nombre"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="mx-2 w-full flex-1 px-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          Apellidos
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["apellidos"] || ""}
            name="apellidos"
            placeholder="apellidos"
            className="w-full appearance-none p-1 px-2 text-gray-800 outline-none"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1 px-1">
        <div className="mt-3 h-6 text-xs font-bold uppercase leading-8 text-gray-500">
          DNI
        </div>
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
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
        <div className="my-2 flex rounded border border-gray-200 bg-white p-1">
          <input
            onChange={handleChange}
            value={userData["telefono"] || ""}
            name="telefono"
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

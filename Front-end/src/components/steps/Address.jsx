import { useContext } from "react";
import { StepperContext } from "../../contexts/StepperContext";
import LocationSearchInput from "./inputSearch";

export default function Details() {
  const { userData, setUserData } = useContext(StepperContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  return (
    <div className="grid grid-cols-2">
      <div className="flex flex-col items-center col-span-2 justify-center font-bold text-white text-2xl">
        Dirección de envio:
        <LocationSearchInput />
      </div>
      {/*       <div className="w-full mx-2 flex-1 px-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Pais:
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["country"] || ""}
            name="country"
            placeholder="pais"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1 px-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Codigo Postal:
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["codigo"] || ""}
            name="codigo"
            placeholder="codigo postal"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1 px-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Estado / departamento:
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["estado"] || ""}
            name="estado"
            placeholder="estado / departamento"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1 px-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Ciudad
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["ciudad"] || ""}
            name="ciudad"
            placeholder="ciudad"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div>
      <div className="w-full mx-2 flex-1 px-1">
        <div className="font-bold h-6 mt-3 text-gray-500 text-xs leading-8 uppercase">
          Dirección
        </div>
        <div className="bg-white my-2 p-1 flex border border-gray-200 rounded">
          <input
            onChange={handleChange}
            value={userData["direccion"] || ""}
            name="direccion"
            placeholder="direccion"
            type="text"
            className="p-1 px-2 appearance-none outline-none w-full text-gray-800"
          />
        </div>
      </div> */}
    </div>
  );
}

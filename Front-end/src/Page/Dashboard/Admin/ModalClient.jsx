import React, { useState } from "react";
import "./modalClient.scss";
import background from "../../../assets/background-cart-modal.png";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import InputField from "../../../components/InputField/InputField";
import axios from "axios";
import { updateCustomer } from "../../../redux/actions/index";
import { useDispatch } from "react-redux";

export default function ModalClient({
  customer,
  setOpenModal,
  modalState,
  reloadCustomers,
}) {
  //const customer = useSelector((state) => state.customer);

  const [loading, setLoading] = useState(false);
  const inputClass = "rounded-lg p-1 border-2 border-purple-900";
  const divClass = "grid px-3";

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const statusOptions = {
    status: { required: "Selecione el estado" },
  };

  const roleOptions = {
    role: { required: "Selecione el estado" },
  };

  const customStyles = {
    control: () => ({
      border: "2px solid #44337a;",
      borderRadius: "0.5rem",
      backgroundColor: loading ? "#a9a9a9" : "#fff",
      display: "flex",
    }),
  };

  const options = [
    { value: "Active", name: "Active" },
    { value: "Inactive", name: "Inactive" },
  ];

  const optionsRole = [
    { value: "admin", name: "admin" },
    { value: "user", name: "user" },
  ];

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    data.status = data.status.name;
    data.rol = data.rol.name;

    setLoading(true);

    try {
      const result = await dispatch(updateCustomer(customer.id_customer, data));

      if (result.message === "user updated") {
        reloadCustomers();
      }

      setLoading(false);
      console.log(result);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div
      className={`flex fixed w-full h-screen z-10 backdrop-blur top-0 left-0 bg-black bg-opacity-50 justify-center items-center ${
        !modalState ? `visible` : `invisible`
      }`}
    >
      <div
        className="cartContainer grid grid-cols-1 grid-rows-5 p-4 bg-white relative h-64 rounded-3xl justify-end text-white bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${background})` }}
      >
        <div className="grid row-span-1 justify-end z-10">
          <button
            className="closeBtn flex items-center justify-center rounded-2xl cursor-pointer"
            onClick={() => setOpenModal(false)}
          >
            X
          </button>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid row-span-4 grid-cols-2 text-black"
        >
          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Nombre"
            type="text"
            placeholder="Nombre"
            name="name"
            register={register}
            registerMessage="Ingresa el nombre"
            patternValue="^[a-zA-Z\s]{1,20}$"
            patternMessage="Solo debe tener letras y maximo 20 caracteres"
            errors={errors}
            disabled={loading}
            value={customer.name ? customer.name : undefined}
          />

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Apellido"
            type="text"
            placeholder="Apellido"
            name="lastName"
            register={register}
            registerMessage="Ingresa el apellido"
            patternValue="^[a-zA-Z\s]{1,20}$"
            patternMessage="Solo debe tener letras y maximo 20 caracteres"
            errors={errors}
            disabled={loading}
            value={customer.lastName ? customer.lastName : undefined}
          />

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="E-mail"
            type="email"
            placeholder="E-mail"
            name="email"
            register={register}
            registerMessage="Ingresa el email"
            patternValue="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            patternMessage="Ingresa un email valido"
            errors={errors}
            disabled={loading}
            value={customer.email ? customer.email : undefined}
          />

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Telefono"
            type="number"
            placeholder="Telefono"
            name="phone"
            register={register}
            registerMessage="Ingresa el telefono"
            patternValue="^[0-9]{8,11}$"
            patternMessage="Ingresa un telefono valido"
            errors={errors}
            disabled={loading}
            value={customer.phone ? customer.phone : undefined}
          />

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="DNI"
            type="number"
            placeholder="DNI"
            name="dni"
            register={register}
            registerMessage="Ingresa el dni"
            patternValue="^[0-9]{8,11}$"
            patternMessage="Ingresa un dni valido"
            errors={errors}
            disabled={loading}
            value={customer.dni ? customer.dni : undefined}
          />

          {/* SELECT */}

          <div className="grid px-3">
            <span className="text-base font-semibold">Estado del usuario:</span>

            <Controller
              name="status"
              control={control}
              defaultValue={
                customer.status === "Active" ? options[0] : options[1]
              }
              render={({ field }) => {
                return (
                  <Select
                    styles={customStyles}
                    options={options}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.name}
                    {...field}
                    placeholder="Selecione el estado"
                    isDisabled={loading}
                    value={options.value}
                    defaultValue={
                      customer.status === "Active" ? options[0] : options[1]
                    }
                  />
                );
              }}
            />

            {errors.status && (
              <p className="text-red-800 font-bold">{errors.status.message}</p>
            )}
          </div>

          <div className="grid px-3">
            <span className="text-base font-semibold">Rol del usuario:</span>

            <Controller
              name="rol"
              control={control}
              defaultValue={
                customer.role === "admin" ? optionsRole[0] : optionsRole[1]
              }
              render={({ field }) => {
                return (
                  <Select
                    styles={customStyles}
                    options={optionsRole}
                    getOptionValue={(option) => option.value}
                    getOptionLabel={(option) => option.name}
                    {...field}
                    placeholder="Selecione el rol del usuario"
                    isDisabled={loading}
                    value={optionsRole.value}
                    //defaultValue={optionsRole[defaultValueRole]}
                    defaultValue={
                      customer.role === "admin"
                        ? optionsRole[0]
                        : optionsRole[1]
                    }
                  />
                );
              }}
            />
            {errors.rol && (
              <p className="text-red-800 font-bold">{errors.rol.message}</p>
            )}
          </div>

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Pais"
            type="text"
            placeholder="Pais"
            name="country"
            register={register}
            registerMessage="Ingresa el pais del usuario"
            patternValue="^[a-zA-Z\s]{1,20}$"
            patternMessage="Solo debe tener letras y maximo 20 caracteres"
            errors={errors}
            disabled={loading}
            value={customer.country ? customer.country : undefined}
          />

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Direccion de envio"
            type="text"
            placeholder="Direccion de envio"
            name="default_shipping_address"
            register={register}
            registerMessage="Ingresa la direccion de envio del usuario"
            patternValue="^[a-zA-Z0-9\s]{1,100}$"
            patternMessage="Solo debe tener letras, numeros y maximo 100 caracteres"
            errors={errors}
            disabled={loading}
            value={
              customer.default_shipping_address
                ? customer.default_shipping_address
                : undefined
            }
          />

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Direccion de facturacion"
            type="text"
            placeholder="Direccion de facturacion"
            name="billing_address"
            register={register}
            registerMessage="Ingresa la direccion de facturacion del usuario"
            patternValue="^[a-zA-Z0-9\s]{1,100}$"
            patternMessage="Solo debe tener letras, numeros y maximo 100 caracteres"
            errors={errors}
            disabled={loading}
            value={
              customer.billing_address ? customer.billing_address : undefined
            }
          />

          <div className="grid col-span-2 px-3 pt-3 justify-center">
            <button
              className="flex justify-center items-center btn-primary rounded-lg text-white h-8 cursor-pointer border-2 px-16"
              type="submit"
            >
              <span className="flex">
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 mr-3 ..."
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Actualizando...
                  </>
                ) : (
                  "Actualizar"
                )}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

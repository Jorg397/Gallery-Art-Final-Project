import React, { useState } from "react";
import "./modal.scss";
import background from "../../../assets/background-cart-modal.png";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import InputField from "../../../components/InputField/InputField";
import axios from "axios";
import { updateOrders } from "../../../redux/actions/index";
import { useDispatch } from "react-redux";

export default function ModalCat({
  setOpenModal,
  modalState,
  order,
  getOrders,
}) {
  const [loading, setLoading] = useState(false);
  const inputClass = "rounded-lg p-1 border-2 border-purple-900";
  const divClass = "grid px-3";

  const dispatch = useDispatch();

  const registerOptions = {
    role: { required: "Selecione el estado" },
  };

  const customStyles = {
    control: () => ({
      border: "2px solid #44337a;",
      borderRadius: "0.5rem",
      backgroundColor: loading ? "#a9a9a9" : "#fff",
    }),
  };

  const options = [
    { value: "Created", name: "Created" },
    { value: "Pending", name: "Pending" },
    { value: "Delivered", name: "Delivered" },
  ];

  const defaultValue =
    order.order_status === "Created"
      ? 0
      : order.order_status === "Pending"
      ? 1
      : order.order_status === "Delivered"
      ? 2
      : null;

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    data.status = data.status.name;

    setLoading(true);
    try {
      const result = await dispatch(updateOrders(order.id_order, data));
      if (result === "order status updated") {
        getOrders();
      }

      setLoading(false);
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
        <div className="grid row-span-2">
          <div className="flex justify-end">
            <button
              className="closeBtn flex items-center justify-center rounded-2xl cursor-pointer"
              onClick={() => setOpenModal(false)}
            >
              X
            </button>
          </div>
          <p>Boleta numero: {order.id_order}</p>
          {order.products?.map((p, i) => (
            <div style={{ border: "2px solid gray" }} key={i}>
              <p>
                <span>
                  <span>{p.sku + " "} - </span>
                </span>
                <span>{p.name + " "} - </span>
                <span>Price: ${p.price}.00</span>
              </p>
            </div>
          ))}
          <p>Importe total: ${order.amount}.00</p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid row-span-2 text-black"
        >
          <div className="grid px-3">
            <span className="text-base font-semibold">Estado de la orden:</span>

            <Controller
              name="status"
              control={control}
              defaultValue=""
              rules={registerOptions.role}
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
                    defaultValue={options[defaultValue]}
                  />
                );
              }}
            />

            {errors.status && (
              <p className="text-red-800 font-bold">{errors.status.message}</p>
            )}
          </div>

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Compañia de envio"
            type="text"
            placeholder="Compañia de envio"
            name="companySend"
            register={register}
            registerMessage="Ingresa la compañia de envio"
            patternValue="^[a-zA-Z0-9s]{1,20}$"
            patternMessage="Solo debe tener letras y numeros maximo 20 caracteres"
            errors={errors}
            disabled={loading}
            value={order.companySend ? order.companySend : undefined}
          />

          <InputField
            className={divClass}
            inputClass={inputClass}
            spanText="Codigo de envio"
            type="text"
            placeholder="Codigo de envio"
            name="codeSend"
            register={register}
            registerMessage="Ingresa el codigo de envio"
            patternValue="^[a-zA-Z0-9s]{1,20}$"
            patternMessage="Solo debe tener letras y numeros maximo 20 caracteres"
            errors={errors}
            disabled={loading}
            value={order.codeSend ? order.codeSend : undefined}
          />
          <div className="grid px-3 pt-3 justify-center">
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

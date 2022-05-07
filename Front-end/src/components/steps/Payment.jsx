import { useContext, useEffect, useRef, useState } from "react";
import style from "./payment.module.css";
import { loadStripe } from "@stripe/stripe-js"; //llama a stripe para cargar la conexion de la plataforma
import {
  Elements,
  CardElement,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"; //hooks de stripe: element envuelve a toda la funcion como un provider
//CardElement es el input que recibimos desde stripe
//useStripe hook que devuelve la conexion del stripe
//useElements

import axios from "axios";
import Button from "../Button";
import { useDispatch, useSelector } from "react-redux";
import { StepperContext } from "../../contexts/StepperContext";
import API from "../../interceptors/base";
import { updateCustomer } from "../../redux/actions/index";

//poner la clave secreta en back y clave publoca en front!!!!!

const stripePromise = loadStripe(
  "pk_test_51Kqkf9FfyRC77Qc7fnEpF3BmxMcokBaXP6AwH1xvoSRXsUwDGE5JLkqQla0VkR88NGBmCgb2l3VTLD9aMLU3WhAV00I7lojf2G"
);
//const stripePromise = loadStripe("<your public key here>");
const CheckoutForm = () => {
  const dispatch = useDispatch();
  const { userData, handleClick } = useContext(StepperContext);

  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);
  const stripe = useStripe();
  const elements = useElements();

  const profile = useSelector((state) => state.profile);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const mountedRef = useRef(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      card: elements.getElement(CardExpiryElement),
      card: elements.getElement(CardCvcElement),
    });
    setLoading(true);
    const profileId = localStorage.getItem("id_customer");
    if (!error) {
      setError("");
      const { id } = paymentMethod;
      console.log("id del usuario ", profile.id_customer);
      try {
        const { data } = await API.post("/payment", {
          id,
          amount: cartTotal, //cents
          id_customer: profileId,
          shipping_address: userData.default_shipping_address,
          products: cart,
          name: userData.name,
          lastName: userData.lastName,
          dni: userData.dni,
          phone: userData.phone,
          email: userData.email,
          country: userData.country,
        });
        if (data.completed) {
          const customerData = {
            dni: userData.dni,
            name: userData.name,
            lastName: userData.lastName,
            phone: userData.phone,
            country: userData.country,
            default_shipping_address: userData.default_shipping_address,
          };
          const result = await dispatch(
            updateCustomer(profileId, customerData)
          );

          if (result.message === "user updated") {
            handleClick("next");
          }

          //elements.getElement(CardElement).clear();
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    } else {
      setLoading(false);
      setError(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);
  const CardElementOptions = {
    style: {
      base: {
        iconColor: "#c9aea7",
        color: "#22223a",
        fontWeight: "500",
        fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
        fontSize: "16px",
        fontSmoothing: "antialiased",
        ":-webkit-autofill": {
          color: "#fce883",
        },
        "::placeholder": {
          color: "#22223a",
        },
        padding: "15px",
      },
      invalid: {
        iconColor: "#22223a",
        color: "#22223a",
      },
    },
    hidePostalCode: true,
  };

  return (
    <form id="formPay" className="card card-body" onSubmit={handleSubmit}>
      {/* Product Information */}
      <div className="pb-24">
        <h3 className="flex justify-center p-3 mt-3 h-6 text-2xl text-white uppercase leading-8 font-bold">
          Realizar pago:
        </h3>
      </div>

      {/* User Card Input */}
      <div className={`form-group`}>
        <div className="flex items-center justify-center text-red-500">
          <p>{error}</p>
        </div>

        <div className={`items-center h-10 ${style.inputYear}`}>
          <CardNumberElement options={CardElementOptions} />
        </div>

        <div className="flex pt-2">
          <div className={`items-center h-10 ${style.inputMonth}`}>
            <CardExpiryElement options={CardElementOptions} />
          </div>
          <div className={`items-center h-10 mx-2 ${style.inputCvv}`}>
            <CardCvcElement options={CardElementOptions} />
          </div>
          <Button
            disabled={!stripe}
            version="v1"
            width="200px"
            height="38px"
            type="submit"
            name={
              loading ? (
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
                  Procesando...
                </>
              ) : (
                "Pagar"
              )
            }
          />
        </div>
      </div>
      {/* deshabilitar el boton mientras se cargar stripe disabled={!stripe} */}
    </form>
  );
};

function Payments() {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <div>
          <div>
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payments;

import { useState } from "react";
import { useSelector } from "react-redux";
import style from "./payment.module.css";
import { loadStripe } from "@stripe/stripe-js"; //llama a stripe para cargar la conexion de la plataforma
import {
  Elements,
  CardElement,
  PaymentElement,
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
//poner la clave secreta en back y clave publoca en front!!!!!

const stripePromise = loadStripe(
  "pk_test_51Kqkf9FfyRC77Qc7fnEpF3BmxMcokBaXP6AwH1xvoSRXsUwDGE5JLkqQla0VkR88NGBmCgb2l3VTLD9aMLU3WhAV00I7lojf2G"
);
//const stripePromise = loadStripe("<your public key here>");
const CheckoutForm = ({ userData, handleClick }) => {
  const cart = useSelector((state) => state.cart);
  const cartTotal = useSelector((state) => state.cartTotal);
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardNumberElement),
      card: elements.getElement(CardExpiryElement),
      card: elements.getElement(CardCvcElement),
    });
    /*     const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    }); */

    /* const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: "http://localhost:3000/",
      },
    }); */
    setLoading(true);

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post("http://localhost:3001/payment", {
          id,
          amount: 10000, //cents
          id_customer: "23d03928-f875-42f8-be35-5cf023be49f9", //debe tomarse desde la sesion el usuario
          cartTotal: cartTotal,
          shipping_address: `${userData.pais}, ${userData.estado}, ${userData.ciudad}, ${userData.codigo}, ${userData.direccion}`,
          products: cart,
        });
        if (data.completed) {
          handleClick("next");
          elements.getElement(CardElement).clear();
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };
  /*   const CardElementContainer = styled.div`
    height: 40px;
    display: flex;
    align-items: center;
    & .StripeElement {
      width: 100%;
      padding: 15px;
    }
  `;
 */
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
                    class="animate-spin h-5 w-5 mr-3 ..."
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      stroke-width="4"
                    ></circle>
                    <path
                      class="opacity-75"
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
        {/* <CardElement options={CardElementOptions} /> */}
        {/* <PaymentElement /> */}
      </div>

      {/* deshabilitar el boton mientras se cargar stripe disabled={!stripe} */}
    </form>
  );
};

function Payments({ userData, handleClick }) {
  return (
    <Elements stripe={stripePromise}>
      <div>
        <div>
          <div>
            <CheckoutForm userData={userData} handleClick={handleClick} />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payments;

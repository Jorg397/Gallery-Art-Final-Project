
import React, { useState } from "react";

import './../Payment/indexmodule.css'

import { loadStripe } from "@stripe/stripe-js";//llama a stripe para cargar la conexion de la plataforma
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js"; //hooks de stripe: element envuelve a toda la funcion como un provider
//CardElement es el input que recibimos desde stripe
//useStripe hook que devuelve la conexion del stripe
//useElements

import axios from "axios";
//poner la clave secreta en back y clave publoca en front!!!!!

const stripePromise = loadStripe("pk_test_51Kqkf9FfyRC77Qc7fnEpF3BmxMcokBaXP6AwH1xvoSRXsUwDGE5JLkqQla0VkR88NGBmCgb2l3VTLD9aMLU3WhAV00I7lojf2G");
//const stripePromise = loadStripe("<your public key here>");                                
const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    setLoading(true);

    if (!error) {
      // console.log(paymentMethod)
      const { id } = paymentMethod;
      try {
        const { data } = await axios.post(
          "http://localhost:3001/payment",
          {
            id,
            amount: 10000, //cents
          }
        );
        console.log(data);

        elements.getElement(CardElement).clear();
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    }
  };

  console.log(!stripe || loading);

  return (
    <form className="card card-body" onSubmit={handleSubmit} >
      {/* Product Information */}
      <img
        src="https://www.corsair.com/medias/sys_master/images/images/h80/hdd/9029904465950/-CH-9109011-ES-Gallery-K70-RGB-MK2-01.png"
        alt="Corsair Gaming Keyboard RGB"
       
      />

      <h3 className="lg:flex  lg:mt-3 md:mx-12 lg:mx-28 lg:justify-center ">Price: 100$</h3>

      {/* User Card Input */}
      <div className="form-group" >
        <CardElement />
      </div >

      <button  disabled={!stripe} >
       Buy
      </button>
    </form>
  );
};

function Payment() {
  return (
    <Elements  stripe={stripePromise}>
      <div className="fondo" >
        <div >
          <div >
            <CheckoutForm />
          </div>
        </div>
      </div>
    </Elements>
  );
}

export default Payment;
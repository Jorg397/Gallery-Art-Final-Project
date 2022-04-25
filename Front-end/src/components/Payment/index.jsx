import React, { useState } from "react";

import "./index.scss";

import { loadStripe } from "@stripe/stripe-js"; //llama a stripe para cargar la conexion de la plataforma
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
import Stepper from "../Stepper.jsx/Stepper";
import StepperControl from "../StepperControl.ljsx/StepperControl";
//poner la clave secreta en back y clave publoca en front!!!!!
import Account from "../steps/Account";
import Address from "../steps/Address";
import Final from "../steps/Final";
import Payments from "../steps/Payment";
import Summary from "../steps/Summary";
import { StepperContext } from "../../contexts/StepperContext";
import imgData from "../../assets/payments/datos.png";
import imgPay from "../../assets/payments/rectangle.png";
const stripePromise = loadStripe(
  "pk_test_51Kqkf9FfyRC77Qc7fnEpF3BmxMcokBaXP6AwH1xvoSRXsUwDGE5JLkqQla0VkR88NGBmCgb2l3VTLD9aMLU3WhAV00I7lojf2G"
);
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
        const { data } = await axios.post("http://localhost:3001/payment", {
          id,
          amount: 10000, //cents
        });
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
    <form className="card card-body" onSubmit={handleSubmit}>
      {/* Product Information */}

      <h3 className="lg:flex  lg:mt-3 md:mx-12 lg:mx-28 lg:justify-center ">
        Price: 100$
      </h3>

      {/* User Card Input */}
      <div className="form-group">
        <CardElement />
      </div>

      <button disabled={!stripe}>Buy</button>
    </form>
  );
};

function Payment() {
  const [currentStep, setCurrentStep] = useState(1);
  const steps = [
    "Datos",
    "Dirección de envio",
    "Verificación",
    "Pago",
    "Finalización",
  ];
  const [userData, setUserData] = useState("");
  const [finalData, setFinalData] = useState([]);

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Address />;
      case 3:
        return <Summary />;
      case 4:
        return <Payments userData={userData} handleClick={handleClick} />;
      case 5:
        return <Final />;
    }
  };
  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
  };

  return (
    <div className="">
      <div className="min-h-screen flex-1 items-center max-w-4x1 max-auto pt-32 px-24">
        <div className="">
          <Stepper currentStep={currentStep} steps={steps} />

          <div
            className={`grid grid-cols-2 gap-8 p-5 bg-no-repeat bg-center bg-cover`}
            style={
              currentStep === 3 ? { backgroundImage: `url(${imgPay})` } : null
            }
          >
            <StepperContext.Provider
              value={{
                userData,
                setUserData,
                finalData,
                setFinalData,
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>

            <div
              className={`grid justify-center ${
                currentStep === 3 ? "divide" : null
              }`}
            >
              {currentStep === 3 ? (
                <>
                  <div
                    className={`summarySpan mt-3 h-6 text-xs uppercase leading-8 font-bold`}
                  >
                    Datos
                  </div>
                  <span className="summarySpan flex justify-between">
                    Nombre: <p>{userData.nombre}</p>
                  </span>
                  <span className="summarySpan flex justify-between">
                    DNI: <p>{userData.dni}</p>
                  </span>
                  <span className="summarySpan flex justify-between">
                    Telefono: <p>{userData.telefono}</p>
                  </span>
                  <span className="summarySpan">
                    Dirección de envio:{" "}
                    <p>
                      {userData.pais}, {userData.estado}, {userData.ciudad},{" "}
                      {userData.codigo}, {userData.direccion}
                    </p>
                  </span>
                </>
              ) : (
                <img src={imgData} alt="" className="max-w-xs" />
              )}
              {console.log(userData)}
            </div>
          </div>
        </div>
        {currentStep !== steps.length && (
          <StepperControl
            handleClick={handleClick}
            currentStep={currentStep}
            steps={steps}
          />
        )}
      </div>
    </div>
  );
}

export default Payment;

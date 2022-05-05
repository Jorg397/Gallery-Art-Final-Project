import React, { useEffect, useState } from "react";
import "./index.scss";

import axios from "axios";
import Stepper from "../Stepper.jsx/Stepper";
import StepperControl from "../StepperControl.ljsx/StepperControl";
import Account from "../steps/Account";
import { Navigate } from "react-router-dom";
import Address from "../steps/Address";
import Final from "../steps/Final";
import Payments from "../steps/Payment";
import Summary from "../steps/Summary";
import { StepperContext } from "../../contexts/StepperContext";
import imgData from "../../assets/payments/datos.png";
import imgPay from "../../assets/payments/rectangle.png";
import { useSelector } from "react-redux";

const validate = (input, data) => {
  //const validText = /^[A-za-z0-9]+[A-za-z0-9-,;!?:.&\s]+$/;
  const validText = /^[A-za-z]{1,15}$/;
  const validNumber = /^[A-za-z0-9]{8,9}$/;

  switch (input) {
    case "name":
      console.log(data[input]);
      return validText.test(data[input]);
    case "lastName":
      return validText.test(data[input]);
    case "dni":
      //console.log(validDni.test(data[input]));
      return validNumber.test(data[input]);
    case "phone":
      return validNumber.test(data[input]);
    case "default_shipping_address":
      return validText.test(data[input]);
    case "id_customer":
      return true;
  }
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
  const profile = useSelector((state) => state.profile);
  const cart = useSelector((state) => state.cart);

  const displayStep = (step) => {
    switch (step) {
      case 1:
        return <Account />;
      case 2:
        return <Address />;
      case 3:
        return <Summary />;
      case 4:
        return <Payments />;
      case 5:
        return <Final />;
    }
  };
  const handleClick = (direction) => {
    let newStep = currentStep;
    direction === "next" ? newStep++ : newStep--;
    if (
      currentStep === 1 &&
      errors.name.validity &&
      errors.lastName.validity &&
      errors.dni.validity &&
      errors.phone.validity
    ) {
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
    if (currentStep === 2 && errors.default_shipping_address.validity) {
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
    if (currentStep === 3 && cart.length) {
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }

    if (direction !== "next" || currentStep > 3) {
      newStep > 0 && newStep <= steps.length && setCurrentStep(newStep);
    }
  };

  useEffect(() => {
    if (profile.default_shipping_address) {
      const {
        id_customer,
        name,
        lastName,
        dni,
        phone,
        email,
        default_shipping_address,
      } = profile;
      setUserData({
        id_customer,
        name,
        lastName,
        dni,
        phone,
        email,
        default_shipping_address,
      });
    }
  }, [profile]);

  const errorsInitialValue = {
    name: { validity: validate("name", userData), msg: "Name is required" },
    lastName: {
      validity: validate("lastName", userData),
      msg: "lastName is required",
    },
    id_customer: {
      validity: validate("id_customer", userData),
      msg: "id is Required",
    },
    dni: { validity: validate("dni", userData), msg: "Dni is Required" },
    phone: {
      validity: validate("phone", userData),
      msg: "phone is Required",
    },
    default_shipping_address: {
      validity: validate("default_shipping_address", userData),
      msg: "Shipping Address is Required",
    },
  };

  const [errors, setErrors] = useState(errorsInitialValue);

  if (localStorage.getItem("token") === null) {
    return <Navigate to="/login" />;
  }

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
                validate,
                errors,
                setErrors,
                handleClick,
              }}
            >
              {displayStep(currentStep)}
            </StepperContext.Provider>

            <div
              className={`grid justify-between pl-10 ${
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
                    Nombre: <p>{userData.name}</p>
                  </span>
                  <span className="summarySpan flex justify-between">
                    DNI: <p>{userData.dni}</p>
                  </span>
                  <span className="summarySpan flex justify-between">
                    Telefono: <p>{userData.phone}</p>
                  </span>
                  <span className="summarySpan">
                    Dirección de envio:{" "}
                    <p>{userData.default_shipping_address}</p>
                  </span>
                </>
              ) : (
                <img src={imgData} alt="" className="max-w-xs" />
              )}
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

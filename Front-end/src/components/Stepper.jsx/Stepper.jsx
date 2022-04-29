import React, { useState, useEffect, useRef } from "react";
import "./stepper.scss";
const Stepper = ({ steps, currentStep }) => {
  const [newStep, setNewStep] = useState([]);
  const stepsRef = useRef();

  const updateStep = (stepNumber, steps) => {
    const newSteps = [...steps];
    /* console.log(newSteps); */
    let count = 0;
    while (count < newSteps.length) {
      //current step
      if (count === stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: true,
          selected: true,
          completed: true,
        };
        count++;
      }

      //step completed
      else if (count < stepNumber) {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: true,
          completed: true,
        };
        count++;
      }
      //step pending
      else {
        newSteps[count] = {
          ...newSteps[count],
          highlighted: false,
          selected: false,
          completed: false,
        };
        count++;
      }
    }

    return newSteps;
  };

  useEffect(() => {
    const stepsState = steps.map((step, index) =>
      Object.assign(
        {},
        {
          description: step,
          completed: false,
          highlighted: index === 0 ? true : false,
          selected: index === 0 ? true : false,
        }
      )
    );

    stepsRef.current = stepsState;
    const current = updateStep(currentStep - 1, stepsRef.current);
    setNewStep(current);
  }, [steps, currentStep]);

  const stepsDisplay = newStep.map((step, index) => {
    return (
      <div
        key={index}
        className={`text-center w-40 text-xs font-medium uppercase mx-1 p-1 color_secondary ${
          index === 0 ? "rounded-l-lg" : ""
        } ${index === steps.length - 1 ? "rounded-r-lg" : ""} ${
          currentStep >= index + 1
            ? "text-black color_quaternary"
            : "text-white"
        }`}
      >
        {step.description}
      </div>
    );
  });
  /*     return (
      <div
        key={index}
        className={
          index !== newStep.length - 1
            ? "w-full flex items-center"
            : "flex items-center"
        }
      >
        <div className="relative flex flex-col items-center text-teal-600">
          <div
            className={`absolute top-0  text-center mt-16 w-32 text-xs font-medium uppercase ${
              step.highlighted ? "text-white bg-red-400" : "text-gray-400"
            }`}
          >
            {step.description}
          </div>
        </div>
      </div>
    );
  }); */

  return (
    <div className="mx-4 p-4 flex justify-center items-center">
      {stepsDisplay}
    </div>
  );
};
export default Stepper;

import Button from "../Button/index";

const StepperControl = ({ handleClick, handleSubmit, currentStep, steps }) => {
  return (
    <div className="container flex justify-around mt-4 mb-8">
      <Button
        onClick={() => handleClick()}
        version="v1"
        width="200px"
        height="38px"
        type="button"
        name="Anterior"
        className={`${
          currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
      />
      {currentStep !== steps.length - 1 ? (
        <Button
          onClick={() => handleClick("next")}
          version="v1"
          width="200px"
          height="38px"
          type="button"
          name={currentStep === steps.length - 1 ? "Confirmar" : "Siguiente"}
          className={`${
            currentStep === steps.length ? "opacity-50 cursor-not-allowed" : ""
          }`}
        />
      ) : null}
    </div>
  );
};

export default StepperControl;

import React from "react";

import "./style.scss";

const TextField = (props) => {
  const { name, label, type,width, height, onChange, error,onBlur } = props;
  return (
    <div className="textField">
      {console.log("este es el error en ele fo¿ield: ", error)}
      <label className="textField__label">{label}</label>
      <input
      onBlur={onBlur}
        className={`textField__input ${error !=="" && "error"}`}
        name={name}
        type={type}
        onChange={onChange}
      />
      {error!=="" && <p className="error">{error}</p>}
    </div>
  );
};

export default TextField;

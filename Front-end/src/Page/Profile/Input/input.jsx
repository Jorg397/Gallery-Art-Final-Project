import React from "react";

import edit from "../../../assets/icons/edit.png";
import save from "../../../assets/icons/save.png";
import "./Input.scss";

const Input = (props) => {
  const { name, text, value, state, onchange, type, onClick, width } = props;
  const icon = state ? save : edit;
  return (
    <div className="input" style={{ width: width }}>
      <label className="input__label">{text}</label>
      {type === "text" ? (
        <input
          disabled={state ? "" : "disabled"}
          type={type}
          className="input__input"
          value={value}
          onChange={(e)=>{
            onchange(e.target.value, name)
          }}
        />
      ) : (
        type === "select" && (
          <select className="input__select">
            <option value="">Seleccione</option>
          </select>
        )
      )}
      {type === "text" && <button
        onClick={() => {
          onClick(name);
        }}
        type={`${state ? "button" : "submit"}`}
      >
        <img src={icon} alt="edit/save" />
      </button>}
    </div>
  );
};

export default Input;

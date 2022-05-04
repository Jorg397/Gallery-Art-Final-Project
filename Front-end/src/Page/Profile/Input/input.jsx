import React from "react";

import edit from "../../../assets/icons/edit.png";
import save from "../../../assets/icons/save.png";
import {toast} from "react-toastify";
import "./Input.scss";

const Input = (props) => {
  const { name, text, value, state,error, onBlur,onchange, type, onClick, width, visibility } = props;
  const icon = state ? save : edit;
  //prettier-ignore
  return (
    <div className="input" style={{ width: width }}>
      <label className="input__label">{text}</label>
      {type === "text" ? (
        <>
        <input
          onBlur={(e)=>onBlur(e.target.value,name)}
          disabled={state || !visibility ? "" : "disabled"}
          type={type}
          className={`input__input ${error !== "" && "error"}`}
          value={value}
          onChange={(e)=>{
            onchange(e.target.value, name)
          }}
        />
        {error!=="" && <p className="error">{error}</p>}
        </>

      ) : (
        type === "select" && (
          <select className="input__select">
            <option value="">Seleccione</option>
          </select>
        )
      )}
      {console.log("state input ", state)}
      {type === "text" && visibility && <button
        onClick={() => {
          !state && error !== "" && toast.error("hay campos con error");
          onClick(name);
        }}
        type={`${state && error==="" ? "button" : "submit"}`}
      >
        <img src={icon} alt="edit/save" />
      </button>}
    </div>
  );
};

export default Input;

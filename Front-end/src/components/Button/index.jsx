import React from "react";

import "./style.scss";

const Button = (props) => {
  const { version, width, type, name, height, icon, onClick, className } =
    props;
  return (
    <div className="button">
      <button
        style={{ width: width, height: height }}
        type={type}
        className={`button__${version} ${className}`}
        onClick={onClick}
      >
        <span>
          {name} {icon && <img src={icon} />}
        </span>
      </button>
    </div>
  );
};

export default Button;

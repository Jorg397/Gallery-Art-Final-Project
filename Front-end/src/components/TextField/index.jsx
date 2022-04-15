import React from 'react';

import './style.scss';

const TextField = (props) => {
    const {name, width, height} = props;
  return (
    <div className="textField">
        <label className="textField__label">{name}</label>
        <input className="textField__input" type="text" />
    </div>
  )
}

export default TextField;
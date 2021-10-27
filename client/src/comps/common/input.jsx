import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="h5 ps-5 pe-5 text-secondary">
      <label htmlFor={name}>{label}</label>
      <input {...rest} name={name} id={name} className="form-control mb-1" />
      {error && <span className="text-danger">{error}</span>}
    </div>
  );
};

export default Input;
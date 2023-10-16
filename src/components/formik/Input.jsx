import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from './TextError';

const Input = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form_control">
      {label && <label htmlFor={name}>{label}</label>}
      <Field id={name} name={name} {...rest} />
      <ErrorMessage className="error_message" name={name} component={TextError}/>
    </div>
  );
};

export default Input;

import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Textarea = (props) => {
  const { label, name, ...rest } = props;
  return (
    <div className="form_control">
      {label && <label htmlFor={name}>{label}</label>}
      <Field as='textarea' id={name} name={name} {...rest} />
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Textarea;

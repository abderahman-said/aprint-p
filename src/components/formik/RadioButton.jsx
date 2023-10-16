import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const RadioButton = (props) => {
  const { label, name, options, extra, inputRef , isPrice , setIsPrice ,  ...rest } = props;
  return (
    <div className="form_control radio">
      {label && <label>{label}</label>}
      <Field name={name} {...rest}>
        {({ field }) =>
          options.map((item, index) => (
            <React.Fragment key={index}>
              {item.value !== "السعر" ? (
                <>
                  <input
                    type="radio"
                    id={item.value}
                    {...field}
                    value={item.value}
                    checked={field.value === item.value}
                    onClick = {()=>item.click ? setIsPrice(true) : setIsPrice(false)}
                  />
                  <label htmlFor={item.value}>{item.value}</label>
                </>
              ) : ( isPrice &&
                <input
                ref={ inputRef}
                type="number"
                id={item.value}
                // {...field}
                placeholder={item.value}
                className="notStyle"
              />
              )}
            </React.Fragment>
          ))
        }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default RadioButton;

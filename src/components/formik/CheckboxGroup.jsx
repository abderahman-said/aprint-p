import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const CheckboxGroup = (props) => {
  const { label, name, options,onchange, ...rest } = props;
  return (
    <div className="form_control check">
      {label && <label>{label}</label>}
      <Field name={name} {...rest}>
        {({ field }) =>
        
          options.map((item, index) => (
            
            <React.Fragment key={index}>
              <label className="container1" htmlFor={item.value}>
                <input
                  type="checkbox"
                  id={item.value}
                  {...field}
                  value={item.value}
                  checked={field.value === true}
                  onClick = {onchange}
                />
                 <span className="label_text">{item.value}</span>
                <span className="checkmark"></span>
              </label>
            </React.Fragment>
          ))
        }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

// <label class="container">One
//   <input type="checkbox" checked="checked">
//   <span class="checkmark"></span>
// </label>

export default CheckboxGroup;

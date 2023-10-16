import React from "react";
import { Field, ErrorMessage } from "formik";
import TextError from "./TextError";

const Select = (props) => {
  const { label, name, options , first , type, onChange , ...rest } = props;
  if(type === 'servicesStatus'){
    return (
      <div className="form_control">
        <Field as='select' id={name} name={name} {...rest} onChange ={onChange} style={{fontSize : "15px" , width : "30%"}} required>
          <option value=''>{first}</option>
          {
              options.map((item , index)=> (
                  <option key={index} value={item.id}>
                      {item.fullAddress}
                  </option>
              ))
          }
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </div>
    );
  }else if(type === 'signUp'){
    return (
      <div className="form_control" style={{ width : "30%" , marginTop : "18px" , }}>
        <Field className='px-2 mt-2 border-0' as='select' id={name} name={name} {...rest}  style={{fontSize : "12px" ,  color : "#888" , width : "80%" , padding : "4px 20px" , background :"#F1F1F2" , borderRadius : "5px"}} required>
          <option value=''>{first}</option>
          {
              options.map((item , index)=> (
                  <option key={index} value={item.mobileCode} >
                      {item.name}
                  </option>
              ))
          }
        </Field>
        <ErrorMessage name={name} component={TextError} />
      </div>
    );
  }
  return (
    <div className="form_control">
      {label && <label htmlFor={name}>{label}</label>}
      <Field as='select' id={name} name={name} {...rest} >
        <option value=''>{first}</option>
        {
            options.map((item , index)=> (
                <option key={index} value={item.city_id}>
                    {item.name_ar}
                </option>
            ))
        }
      </Field>
      <ErrorMessage name={name} component={TextError} />
    </div>
  );
};

export default Select;

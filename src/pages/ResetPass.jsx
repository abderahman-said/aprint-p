import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/login/login.module.css";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import Loader from "../components/Loader";
import { Link ,  useNavigate } from "react-router-dom";


const ResetPass = ({ lang, isUser, setIsUser }) => {
  const [loginErrors, setLoginErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate()

  const initialValues = {
    email: "",
    password : "",
    rePassword : "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("مطلوب"),
    password: Yup.string().required("مطلوب"),
    rePassword: Yup.string().required("مطلوب"),
  });

  const onSubmit = async (values) => {
   console.log(values);
   setIsLoading(true);
      await axios
        .post(
          "https://dashboard.mobtkra-press.com/api/reset/password",
          {
            email: values.email,
            newPassword : values.password,
            password_confirmation : values.rePassword,
          },
          {
            headers: {
              lang: lang,
            },
          }
        )
        .then((res) => {
          setModalShow(true);
          setSuccessMessage(res.data.status);
          console.log(res.data.status);
          setTimeout(() => {
            navigate(`/login`)
          }, 1000);
        })
        .catch((error) => {
          setLoginErrors(error.response.data.errors);
        })
        .finally(() => setIsLoading(false));
  };



  return (
    <section className={styles.LoginSection}>
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        body={successMessage}
      />
      {isLoading &&  <div  className='d-flex justify-content-center align-items-center' style={{height : "100%" ,width : "100%" , position :"fixed" , top :"0" , left : "0" , zIndex :"111111111" ,backgroundColor : "rgba(0,0,0,0.8)" }}><Loader /></div>}
     
        <div className={styles.loginDiv}>
          <h4 className="text-center mb-3">  إعادة تعيين كلمة المرور</h4>
          <p className="text-center text-info" style={{fontSize : ".8rem"}}>من فضلك ادخل كود التفعيل الذي تم ارساله علي البريد الالكتروني</p>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="mt-2">
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    placeholder={
                      lang === "ar"
                        ? "ادخل البريد الالكتروني"
                        : "Enter Email address"
                    }
                  />
                    <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    placeholder={
                      lang === "ar" ? "  كلمة السر الجديده" : "new password"
                    }
                  />
                    <FormikControl
                    control="input"
                    type="password"
                    name="rePassword"
                    placeholder={
                      lang === "ar" ? "اعادة كلمة السر" : "re password"
                    }
                  />
                  {loginErrors.map((item, index) => (
                    <p key={index} className="text-danger me-4 mt-2">
                      * {item}
                    </p>
                  ))}
               
                  <input
                    type="submit"
                    className={`login_btn ${
                      !formik.isValid ? `${styles.disabled}` : ""
                    }`}
                    style={{ marginTop: "140px !important" , borderRadius : "5px !important" }}
                    disabled={!formik.isValid}
                    value=" ارسال"
                  />
                </Form>
              );
            }}
          </Formik>
          
        </div>
        
     
     
    </section>
  );
};

export default ResetPass;

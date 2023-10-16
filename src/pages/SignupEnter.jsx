import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/login/login.module.css";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";

const SignupEnter = ({ lang, isUser, setIsUser }) => {
  const [loginErrors, setLoginErrors] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const initialValues = {
    email: "",
    code: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("need"),
    code: Yup.string().required("need"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/verify-otp`,
        {
          email: values.email,
          otp: values.code,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setModalShow(true);
        setSuccessMessage(res.data.message);
        setTimeout(() => {
          navigate(`/login`);
        }, 1500);
      })
      .catch((error) => {
        setLoginErrors(error.response.data.message);
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
      {isLoading && (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{
            height: "100%",
            width: "100%",
            position: "fixed",
            top: "0",
            left: "0",
            zIndex: "111111111",
            backgroundColor: "rgba(0,0,0,0.8)",
          }}
        >
          <Loader />
        </div>
      )}

      <div className={styles.loginDiv}>
        <h4 className="text-center mb-3"> Register a new account</h4>
        <p className="text-center text-info" style={{ fontSize: ".8rem" }}>
          Please enter the activation code that was sent to the e-mail
        </p>
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
                  placeholder={"Enter Email address"}
                />
                <FormikControl
                  control="input"
                  type="text"
                  name="code"
                  placeholder={"Enter verification code"}
                />
                {/* {loginErrors.map((item, index) => (
                  <p key={index} className="text-danger me-4 mt-2">
                    * {item}
                  </p>
                ))} */}
                <p className="text-danger me-4 mt-2">* {loginErrors}</p>

                <input
                  type="submit"
                  className={`login_btn ${
                    !formik.isValid ? `${styles.disabled}` : ""
                  }`}
                  style={{
                    marginTop: "140px !important",
                    borderRadius: "5px !important",
                  }}
                  disabled={!formik.isValid}
                  value=" Send"
                />
              </Form>
            );
          }}
        </Formik>
        <Link className={styles.not}>{" resend code "}</Link>
      </div>
    </section>
  );
};

export default SignupEnter;

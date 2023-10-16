import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/login/login.module.css";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import styles1 from "../styles/sign up/sign.module.css";
import { COUNTRIES } from "../data/data";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaLinkedinIn, FaLock } from "react-icons/fa";
import { AiFillApple, AiOutlineTwitter } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { BsTelephone } from "react-icons/bs";
import { signINWithGoogle } from "../firebase";
const SignUp = ({ lang, isUser, setIsUser }) => {
  const [loginErrors, setLoginErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };
  const validationSchema = Yup.object({
    name: Yup.string().required("Need"),
    email: Yup.string().required("Need"),
    phone: Yup.string().required("Need"),
    password: Yup.string().required("Need"),
    confirmPassword: Yup.string().required("Need"),
  });

  const onSubmit = async (values) => {
    setIsLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/register`,
        {
          name: values.name,
          email: values.email,
          phone: values.phone,
          password: values.password,
          password_confirmation: values.confirmPassword,
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
        setSuccessMessage("Login success");
        setTimeout(() => {
          navigate(`enterCode`);
        }, 2000);
      })
      .catch((error) => {
        setLoginErrors("Plese Try Again");
        console.log(error.response.errors.map((ele) => ele));
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <section className={`${styles.LoginSection}`}>
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        // header={}
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
      <div className={styles.LogPage}>
        <div className={`${styles.loginDiv} `}>
          <h4 className="text-center mb-3"> Create New Account </h4>
          <div className={styles.HeaderLog}>
            <Link to="/login" className={styles.notactive}>
              {"Login "}
            </Link>
            <div></div>
            <Link to="/signUp" className={styles.active}>
              {"create new account "}
            </Link>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form className="mt-2">
                  <label>
                    <HiOutlineMailOpen /> Name
                  </label>
                  <FormikControl
                    control="input"
                    type="text"
                    name="name"
                    placeholder={"Enter username"}
                  />
                  <label>
                    <HiOutlineMailOpen /> email
                  </label>
                  <FormikControl
                    control="input"
                    type="email"
                    name="email"
                    placeholder={"Enter Email address"}
                  />

                  <label>
                    <FaLock /> password
                  </label>
                  <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    placeholder={"Enter password"}
                  />
                  <label>
                    <FaLock /> password
                  </label>
                  <FormikControl
                    control="input"
                    type="password"
                    name="confirmPassword"
                    placeholder={"re enter password"}
                  />
                  <label>
                    <BsTelephone /> Phone
                  </label>
                  <FormikControl
                    control="input"
                    type="text"
                    name="phone"
                    placeholder={"Enter phone number"}
                  />
                  {/* {loginErrors &&
                    loginErrors.map((item, index) => (
                      <p
                        style={{ fontSize: ".7rem" }}
                        key={index}
                        className="text-danger me-4 mt-2"
                      >
                        * {item}
                      </p>
                    ))} */}

                  <input
                    type="submit"
                    // className={`login_btn ${
                    //   !formik.isValid ? `${styles.disabled}` : ""
                    // }`}
                    style={{
                      marginTop: "140px !important",
                      borderRadius: "5px !important",
                    }}
                    className={`main_btninput`}
                    // disabled={!formik.isValid}
                    value="  Create"
                  />
                </Form>
              );
            }}
          </Formik>
          <p className="text-center">Or</p>
          <div className={styles.iconSection}>
            {/* <div>
              <AiOutlineTwitter />
            </div>
            <div>
              <AiFillApple />
            </div>
            <div>
              <FaLinkedinIn />
            </div> */}
            <div
              onClick={() => {
                signINWithGoogle();
              }}
            >
              <FcGoogle />
            </div>
          </div>
          {/* <Link to="/login" className={styles.not}>
            {lang === "ar"
              ? " لديك حساب بالفعل قم بتسجبل الدخول "
              : "already have account ? login here "}
          </Link> */}
        </div>
        <div className={styles.SideSection}></div>
      </div>
    </section>
  );
};

export default SignUp;

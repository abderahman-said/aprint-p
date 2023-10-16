import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/login/login.module.css";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaLinkedinIn, FaLock } from "react-icons/fa";
import { AiFillApple, AiOutlineTwitter } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { signINWithGoogle } from "../firebase";
const Login = ({ lang, isUser, setIsUser }) => {
  const [loginErrors, setLoginErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().required("Need"),
    password: Yup.string().required("Need"),
  });

  const onSubmit = async (values) => {
    if (!localStorage.getItem("ut")) {
      setIsLoading(true);
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/login`,
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("ut", `Bearer ${res.data.data.token}`);
          localStorage.setItem("ui_Ap", `${res.data.data.id}`);
          setIsUser(true);
          setModalShow(true);
          setSuccessMessage(res.data.status);
          setTimeout(() => {
            navigate(`/`);
          }, 1000);
        })
        .catch((error) => {
          setLoginErrors(error.response.data.errors);
        })
        .finally(() => setIsLoading(false));
    }
  };

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = localStorage.getItem("ut");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  return (
    <section className={styles.LoginSection}>
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
        <div className={styles.loginDiv}>
          <h4 className="text-center mb-3"> Login</h4>
          <div className={styles.HeaderLog}>
            <Link to="/login" className={styles.active}>
              {"Login "}
            </Link>
            <div></div>
            <Link to="/signUp" className={styles.notactive}>
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
                    <HiOutlineMailOpen /> email
                  </label>
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
                  <label>
                    <FaLock /> password
                  </label>

                  <FormikControl
                    control="input"
                    type="password"
                    name="password"
                    placeholder={
                      lang === "ar" ? "ادخل كلمة السر" : "Enter password"
                    }
                  />
                  {loginErrors &&
                    loginErrors.map((item, index) => (
                      <p key={index} className="text-danger me-4 mt-2">
                        * {item}
                      </p>
                    ))}
                  <Link
                    to="/forgetpass"
                    style={{ textAlign: "right", width: "100%" }}
                  >
                    forget password ?
                  </Link>
                  <input
                    type="submit"
                    className={`login_btn ${
                      !formik.isValid ? `${styles.disabled}` : ""
                    } main_btninput`}
                    style={{
                      marginTop: "140px !important",
                      borderRadius: "5px !important",
                    }}
                    disabled={!formik.isValid}
                    value="Enter Now "
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
        </div>
        <div className={styles.SideSection}></div>
      </div>
    </section>
  );
};

export default Login;

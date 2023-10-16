import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import Loader from "../components/Loader";
import styles from "../styles/buyService/buyService.module.css";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import img5 from "../assets/images/service_Item/6.png";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import TextError from "../components/formik/TextError";
import { MdOutlineUploadFile } from "react-icons/md";
import styles1 from "../styles/currentOrders/current.module.css";
import { IoIosArrowDropright } from "react-icons/io";
import currentImage from "../assets/current.png";
import icon1 from "../assets/ico1.png";
import icon2 from "../assets/ico2.png";
import icon3 from "../assets/ico3.png";
const Processing = ({ lang, isUser }) => {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [finalData, setFinalData] = useState({ details: "", user_file: {} });
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [requestResult, setRequestResult] = useState("");
  const serviceId = parseInt(2);
  const onServicesSuccess = (data) => {
    setServiceData(data.data.data);
  };
  const onServicesError = (error) => {
    console.log("Error", error);
  };

  const [details, setDetails] = useState("");
  const [fiels, setfiles] = useState(null);
  const servicesFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ut")}`,
      },
    });
  };
  const {
    isLoading: serviceLoading,
    error: servicesError,
    isFetching,
    refetch,
  } = useQueryHook(
    "servicesFinal",
    onServicesSuccess,
    onServicesError,
    servicesFetcher,
    false
  );

  const initialValues = {
    files: [],
    message: "",
    _method: "put",
  };
  const validationSchema = Yup.object({
    // file: Yup.,
    message: Yup.string().required("Need"),
  });

  const formData = new FormData();
  const onSubmit = (values) => {
    console.log(values);
    if (!isUser) {
      setRequestResult("please login first ");
      setModalShow(true);
    } else {
      formData.append("files[]", values.files[0]);
      formData.append("details", values.message);
      formData.append("_method", "put");
      addCartRefetch();
    }
  };

  const onSuccess1 = (data) => {
    setModalShow(true);
    setRequestResult("Resend Successfully");
    setTimeout(() => {
      navigate(`/currentOrders`);
    }, 3000);
  };
  const onError1 = (error) => {
    console.log(error);
    setModalShow(true);
  };

  const fetcher1 = () => {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/orders/${id}`,
      formData,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("ut")}`,
        },
      }
    );
  };
  const {
    isLoading: addCartLoading,
    error: addCartError,
    isFetching: addCartFetching,
    refetch: addCartRefetch,
  } = useQueryHook("buy service", onSuccess1, onError1, fetcher1, false);

  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <div className={`${styles1.currentSection} py-5`}>
      <Helmet title={"Rejected"}>
        <ModalMe
          show={modalShow}
          lang={lang}
          onHide={() => setModalShow(false)}
          body={requestResult}
        />
        <Container>
          <Row className=" justify-content-between">
            <Col md={4}>
              <h3 className={styles1.heading}> Current Orders</h3>
            </Col>
            <Col md={4}>
              <div className={`text-end ${styles.arrow}`}>
                <IoIosArrowDropright />
              </div>
            </Col>
          </Row>

          {serviceLoading || isFetching || addCartLoading || addCartFetching ? (
            <div className="mt-5">
              <Loader />
            </div>
          ) : servicesError ? (
            <p className="text-danger text-center display-4">
              something went wrong
            </p>
          ) : (
            <section className={`${styles.buyProductSection}`}>
              {/* <h3
                className={`${styles.heading} text-center`}
                style={{ marginBottom: "70px" }}
              >
                {" "}
                {serviceData.subServiceName}
              </h3> */}
              <Row>
                <Col lg="6" xl="6">
                  {serviceData && (
                    <div style={{ textAlign: "center" }}>
                      <img src={serviceData.image} alt="test" />
                    </div>
                  )}
                </Col>
                <Col lg="6" xl="6">
                  <div>
                    <Row className=" justify-content-lg-between">
                      <Col md={6}>
                        <h2 className={styles1.Rejected}> Rejected</h2>
                        <p className={` mb-2 ${styles1.wait}`}>
                          {" "}
                          {serviceData && serviceData.message}
                          {/* We Are Currently Processing your Order */}
                        </p>
                      </Col>
                      <Col md={6} className="  text-end">
                        <h2 className={styles1.OrderId}> Order ID :</h2>
                        <p className={` mb-2 ${styles1.wait}`}>
                          {" "}
                          {serviceData && serviceData.code}
                        </p>
                      </Col>
                    </Row>
                    <div>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        {(formik) => {
                          return (
                            <Form className="mt-2">
                              <label
                                style={{ fontSize: ".8rem" }}
                                htmlFor=""
                                className={`mb-1 `}
                              >
                                {" "}
                                <img
                                  src={icon1}
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    marginRight: "15px",
                                  }}
                                  alt="  Details Of Service"
                                />
                                Details Of Service
                              </label>
                              <FormikControl
                                control="textarea"
                                rows="5"
                                name="message"
                                className={` ${styles1.Details}`}
                                placeholder="   Write your Description here ..."
                              />

                              <label
                                style={{ fontSize: ".8rem" }}
                                className="mb-1"
                                htmlFor=""
                              >
                                <img
                                  src={icon2}
                                  style={{
                                    width: "15px",
                                    height: "15px",
                                    marginRight: "15px",
                                    marginBottom: "10px",
                                  }}
                                  alt="  Details Of Service"
                                />
                                Design File
                              </label>
                              <label
                                htmlFor="file"
                                className={`${styles.custom_file_upload} ${styles1.file}`}
                              >
                                <p
                                  className="text-secondary mb-0"
                                  style={{ fontSize: ".9rem" }}
                                >
                                  Please send all required files...
                                </p>
                                <div className={`${styles.uIconContainer}`}>
                                  <MdOutlineUploadFile />
                                </div>

                                <input
                                  id="file"
                                  name="file"
                                  type="file"
                                  multiple={true}
                                  onChange={(event) => {
                                    const file = event.target.files;
                                    formik.setFieldValue("files", file);
                                    setfiles(event.target.files);
                                  }}
                                />
                              </label>
                              <ErrorMessage
                                className="error_message"
                                name="file"
                                component={TextError}
                              />

                              <input
                                type="submit"
                                className={` ${
                                  !formik.isValid ? `${styles.disabled}` : ""
                                }
                          main_btninput`}
                                disabled={!formik.isValid}
                                value="Resend "
                              />
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>
          )}
        </Container>
      </Helmet>
    </div>
  );
};

export default Processing;

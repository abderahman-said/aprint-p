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
import ServicesSwiper from "../components/ServicesSwiper/ServicesSwiper";

const BuyService = ({ lang, isUser }) => {
  const { id1, id2, id3 } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [finalData, setFinalData] = useState({ details: "", user_file: {} });
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [requestResult, setRequestResult] = useState("");
  const serviceId = parseInt(id2);
  const onServicesSuccess = (data) => {
    const servData = { subServiceName: "", subServiceSubImg: "" };
    servData.subServiceName = data.data.data.name;
    servData.subServiceMainImg = data.data.data.images;
    setServiceData(servData);
    setMainName(data.data.data.meta_title);
    setMeta_des(data.data.data.meta_description);
  };
  const onServicesError = (error) => {
    // console.log("Error", error);
  };
  const servicesFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/services/${id3}`);
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
    file: {},
    message: "",
  };
  const validationSchema = Yup.object({
    // file: Yup.,
    message: Yup.string().required("Need"),
  });

  const formData = new FormData();
  const onSubmit = (values) => {
    if (!isUser) {
      setRequestResult("please login first ");
      setModalShow(true);
    } else {
      formData.append("files[]", values.file);
      formData.append("service_id", serviceId);
      formData.append("details", values.message);
      addCartRefetch();
    }
  };

  const onSuccess1 = (data) => {
    setModalShow(true);
    setRequestResult(data.data.message);
    setTimeout(() => {
      navigate(`/currentOrders`);
    }, 3000);
  };
  const onError1 = (error) => {
    console.log(error.response.data.errors[0]);
    setModalShow(true);
  };

  const fetcher1 = () => {
    return axios.post(`${process.env.REACT_APP_BACKEND_API}/orders`, formData, {
      headers: {
        // "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
  };
  const {
    isLoading: addCartLoading,
    error: addCartError,
    isFetching: addCartFetching,
    refetch: addCartRefetch,
  } = useQueryHook("buy service", onSuccess1, onError1, fetcher1, false);

  useEffect(() => {
    if (!serviceData) {
      refetch();
    }
  }, [refetch, serviceData]);
  const [mainName, setMainName] = useState("");
  const [meta_des, setMeta_des] = useState("");

  return (
    <Helmet title={mainName}>
      <meta name="description" content={meta_des} />
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        body={requestResult}
      />
      <Container>
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
            {serviceData && (
              <h3
                className={`${styles.heading} text-center`}
                style={{ marginTop: "50px", marginBottom: "70px" }}
              >
                {" "}
                {serviceData.subServiceName}
              </h3>
            )}

            <Row>
              {serviceData && (
                <Col lg="6" xl="6">
                  <ServicesSwiper elements={serviceData.subServiceMainImg} />
                </Col>
              )}

              <Col lg="6" xl="6">
                <div>
                  <p className="mb-2">
                    {" "}
                    Please Provide us With The following Required
                  </p>
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
                              className="mb-1"
                              htmlFor=""
                            >
                              {" "}
                              Details Of Service
                            </label>
                            <FormikControl
                              control="textarea"
                              rows="5"
                              name="message"
                              placeholder="   Write your Description here ..."
                            />
                            <label
                              style={{ fontSize: ".8rem" }}
                              className="mb-1"
                              htmlFor=""
                            >
                              {" "}
                              Design File
                            </label>
                            <label
                              htmlFor="file"
                              className={`${styles.custom_file_upload}`}
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
                                onChange={(event) => {
                                  const file = event.target.files[0];
                                  formik.setFieldValue("file", file);
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
                              value="Send  "
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
  );
};

export default BuyService;

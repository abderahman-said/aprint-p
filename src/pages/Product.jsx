import React, { useState, useEffect } from "react";
import styles from "../styles/product/product.module.css";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import axios from "axios";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import Loader from "../components/Loader";
import TextError from "../components/formik/TextError";
import { useParams, useNavigate, Link } from "react-router-dom";
import { MdKeyboardArrowLeft, MdOutlineUploadFile } from "react-icons/md";
import ProductImg from "../assets/product Details.png";
import proImg from "../assets/product.png";
import ServiceItem from "../components/ServiceItem";
const Product = ({ lang, isUser }) => {
  const { id, id2 } = useParams();
  const [selectPrice, setSelectPrice] = useState(0);
  const [productDetails, setProductDetails] = useState({
    product_quantity_price: [],
  });
  const [modalShow, setModalShow] = useState(false);
  const [requestResult, setRequestResult] = useState("");

  const navigate = useNavigate();

  const initialValues = {
    file: {},
    message: "",
  };
  const validationSchema = Yup.object({
    // file: Yup.array().min(1, "اختر علي الأقل ملف واحد"),
    message: Yup.string().required("مطلوب"),
  });

  const formData = new FormData();
  const onSubmit = (values) => {
    if (!isUser) {
      setRequestResult(
        lang === "ar" ? "من فضلك سجل دخولك أولا" : "please login first "
      );
      setModalShow(true);
    } else {
      formData.append("file", values.file);
      formData.append("product_id", id2);
      formData.append("details", values.message);
      addCartRefetch();
    }
  };

  const handleChange = (e) => {
    setSelectPrice(e.target.value);
  };
  const onSuccess = (data) => {
    setProductDetails(data.data.data);
  };
  const onError = (error) => {
    // console.log("Error", error);
  };
  const onSuccess1 = (data) => {
    setRequestResult(data.data.status);
    setModalShow(true);
    setTimeout(() => {
      navigate(`/cart`);
    }, 3000);
  };
  const onError1 = (error) => {
    setRequestResult(error.response.data.errors[0]);
    setModalShow(true);
  };

  // Display the key/value pairs
  // for (var pair of formData.entries()) {
  //   console.log(pair[0] + ', ' + pair[1]);
  // }
  const fetcher = () => {
    return axios.post(
      "https://dashboard.mobtkra-press.com/api/one/sub/product",
      {
        subProductId: id2,
      },
      {
        headers: {
          lang: lang === "ar" ? "ar" : "en",
        },
      }
    );
  };
  const fetcher1 = () => {
    return axios.post(
      "https://dashboard.mobtkra-press.com/api/add/product/cart",
      formData,
      {
        headers: {
          lang: lang === "ar" ? "ar" : "en",
        },
      }
    );
  };

  const {
    isLoading: serviceLoading,
    error: servicesError,
    isFetching,
    refetch,
  } = useQueryHook("addCart", onSuccess, onError, fetcher, false);

  const {
    isLoading: addCartLoading,
    error: addCartError,
    isFetching: addCartFetching,
    refetch: addCartRefetch,
  } = useQueryHook("addCartRequest", onSuccess1, onError1, fetcher1, false);

  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className={""}>
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        body={requestResult}
      />
      <Helmet title={productDetails.productName}>
        <section className={`${styles.productSection}`}>
          {(addCartLoading || addCartFetching) && (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                height: "100%",
                width: "100%",
                position: "fixed",
                top: "0",
                left: "0",
                backgroundColor: "rgba(0,0,0,0.8)",
              }}
            >
              <Loader />
            </div>
          )}
          <Container>
            {serviceLoading || isFetching ? (
              <div className="mt-5">
                <Loader />
              </div>
            ) : servicesError ? (
              <p className="text-danger text-center display-4">
                something went wrong
              </p>
            ) : (
              <Row>
                <Col xl="6" lg="6">
                  <div className="d-flex justify-content-between align-items-center">
                    <h3>{productDetails.productName}</h3>
                    <p className="mt-3"> 120$ - Piece </p>
                  </div>
                  <p className="mb-1 mt-3 "> About Product</p>
                  <p
                    style={{
                      color: "#15355A",
                      // fontWeight: "bold",
                      fontSize: "20px",
                    }}
                  >
                    {" "}
                    {productDetails.productDesc}
                  </p>
                  <label htmlFor="select" className=" mt-3">
                    Options
                  </label>
                  <div>
                    <select onChange={handleChange} name="select" id="select">
                      <option value=""> Choose Option</option>
                      {productDetails.product_quantity_price.map((item) => (
                        <option key={item.quantity} value={item.price}>
                          {" "}
                          {item.quantity}
                        </option>
                      ))}
                    </select>
                    {/* <Badge
                      style={{ marginInlineStart: "30px", fontSize: ".9rem" }}
                      bg="secondary"
                    >
                      {selectPrice} ر.س
                    </Badge> */}
                  </div>
                  <div>
                    <p className="mb-0 mt-4 "> Design Files </p>
                    <div className={`${styles.formContainer}`}>
                      <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                      >
                        {(formik) => {
                          return (
                            <Form className="mt-2">
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

                              <label className="mb-3" htmlFor="">
                                Design Details
                              </label>
                              <FormikControl
                                control="textarea"
                                rows="5"
                                name="message"
                                placeholder="   Details On Order ..."
                              />
                              <input
                                type="submit"
                                className={` ${
                                  !formik.isValid
                                    ? `${styles.disabled} main_btn `
                                    : ""
                                } main_btninput`}
                                disabled={!formik.isValid}
                                value="  Add to Cart"
                              />
                            </Form>
                          );
                        }}
                      </Formik>
                    </div>
                  </div>
                </Col>
                <Col xl="6" lg="6">
                  <div className={styles.second}>
                    <img src={ProductImg} alt="" />
                  </div>
                </Col>
              </Row>
            )}
          </Container>
        </section>
        <Container>
          <h2 className="mt-2">Similar Products</h2>
          <Row>
            <Col xs="12" sm="12" md="6" lg="4" className="p-1 mt-4">
              <div className={styles.servicesItem}>
                <ServiceItem type="Simmiler" />
              </div>
            </Col>
            <Col xs="12" sm="12" md="6" lg="4" className="p-1 mt-4">
              <div className={styles.servicesItem}>
                <ServiceItem type="Simmiler" />
              </div>
            </Col>
            <Col xs="12" sm="12" md="6" lg="4" className="p-1 mt-4">
              <div className={styles.servicesItem}>
                <ServiceItem type="Simmiler" />
              </div>
            </Col>
          </Row>
        </Container>
      </Helmet>
    </div>
  );
};

export default Product;

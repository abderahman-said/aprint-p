import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import styles1 from "../styles/serviceFinal/serviceFinal.module.css";
import axios from "axios";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import Loader from "../components/Loader";
import ServicesImg from "../assets/service.png";
const ServiceFinal = ({ lang }) => {
  const [serviceDetails, setServiceDetails] = useState(null);
  const { id, id2 } = useParams();

  const onServicesSuccess = (data) => {
    setServiceDetails(data.data.data);
    setMainName(data.data.data.name);
  };
  const onServicesError = (error) => {
    // console.log("Error", error);
  };
  const servicesFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/services/${id2}`);
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
  useEffect(() => {
    if (!serviceDetails) {
      refetch();
    }
  }, [refetch, serviceDetails]);
  const [mainName, setMainName] = useState("");

  return (
    <Helmet title={mainName}>
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
          <>
            {serviceDetails && (
              <h3
                className={`${styles1.heading} text-center`}
                style={{ marginTop: "50px", marginBottom: "70px" }}
              >
                {" "}
                {serviceDetails?.name}
              </h3>
            )}

            <Row className="mt-5 text-center">
              <Col sm="12" xs="12" md="12" lg="4" xl="4">
                <img
                  style={{ borderRadius: "10px" }}
                  className="img-fluid"
                  src={serviceDetails?.images[0]}
                  alt=""
                />
              </Col>
              <Col sm="12" xs="12" md="12" lg="8" xl="8">
                <div className={` ${styles1.element} d-flex flex-column pe-5`}>
                  <h5 style={{ fontWeight: "normal" }}> About Service</h5>
                  <p
                    style={{ fontSize: ".9rem" }}
                    className="text-secondary mt-3"
                  >
                    {serviceDetails?.description[0]}
                  </p>
                </div>
              </Col>
            </Row>
            <Row className="mt-5 text-center">
              <Col sm="12" xs="12" md="12" lg="4" xl="4">
                <img
                  style={{ borderRadius: "10px" }}
                  className="img-fluid "
                  src={serviceDetails?.images[1]}
                  alt=""
                />
              </Col>
              <Col sm="12" xs="12" md="12" lg="8" xl="8">
                <div className={` ${styles1.element} d-flex flex-column pe-5`}>
                  <h5 style={{ fontWeight: "normal" }}> More Description</h5>
                  <p
                    style={{ fontSize: ".9rem" }}
                    className="text-secondary mt-4"
                  >
                    {serviceDetails?.description[1]}
                  </p>
                </div>
              </Col>
            </Row>
            <div className="w-50 m-auto">
              <Link to={`${id2}`} className={` main_btn  mt-5 text-center`}>
                Order Service Now
              </Link>
            </div>
          </>
        )}
      </Container>
    </Helmet>
  );
};

export default ServiceFinal;

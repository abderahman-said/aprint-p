import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import styles1 from "../styles/currentOrders/current.module.css";
import ServiceItem from "../components/ServiceItem";
import Loader from "../components/Loader";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "../styles/home/home.module.css";
import { IoIosArrowDropright } from "react-icons/io";

const CurrentProducts = ({ lang }) => {
  const [servicesList, setServicesList] = useState([]);

  const onSuccess = (data) => {
    setServicesList(data.data.data);
  };
  const onError = (error) => {
    console.log("Error", error);
  };

  const fetcher = () => {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/product/orders?status=1`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ut")}`,
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

  useEffect(() => {
    refetch();
  }, [refetch]);
  const navigate = useNavigate();

  return (
    <div>
      <Helmet title={"current orders"}>
        <section className={`${styles1.currentSection} py-5`}>
          <Container>
            <Row className=" justify-content-between">
              <Col md={4}>
                <h3 className={styles1.heading}> current orders</h3>
              </Col>
              <Col md={4}>
                <div
                  className={`d-flex align-items-center justify-content-center ${styles.Btns}`}
                >
                  <button
                    className={`main_btn ${styles.active}`}
                    onClick={() => {
                      navigate("/currentProducts");
                    }}
                  >
                    Products
                  </button>
                  <button
                    className={`main_btn_two ${styles.notActive}`}
                    onClick={() => {
                      navigate("/currentOrders");
                    }}
                  >
                    Services
                  </button>
                </div>
              </Col>
              <Col md={4}>
                <div className={`text-center ${styles.arrow}`}>
                  <IoIosArrowDropright />
                </div>
              </Col>
            </Row>
            {serviceLoading || isFetching ? (
              <div className="mt-5">
                <Loader />
              </div>
            ) : servicesError ? (
              <p className="text-danger text-center display-4">
                something went wrong
              </p>
            ) : (
              <div className={`${styles1.servicesContainer}`}>
                {/* <Row>
                  {servicesList.map((item, index) => (
                    <Col key={index} lg="4" xl="4" className="mt-5">
                      <Link
                        to={`proStatus?n1=${item.Order_Status.id}&n2=${item.Order_id}`}
                        className={styles1.links}
                      >
                        <div className={`${styles1.serviceItemCont}`}>
                          <ServiceItem service={item} type="currentProduct" />
                        </div>
                      </Link>
                    </Col>
                  ))}
                </Row> */}
              </div>
            )}

            <div className={`${styles1.servicesContainer}`}>
              <Row>
                {servicesList.length > 0 &&
                  servicesList &&
                  servicesList.map((ele) => {
                    return (
                      <Col lg="4" xl="4" className="mt-5" key={ele.id}>
                        <div className={styles1.links}>
                          <div className={`${styles1.serviceItemCont}`}>
                            <ServiceItem
                              backgroundColor={"#43A771"}
                              type="currentProduct"
                              process="Processing"
                              order_item={ele}
                            />
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                {/* <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#43A771"}
                        type="currentProduct"
                        process="Processing"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#009AE2"}
                        type="currentProduct"
                        process="Waiting For Payment"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#C13E3E"}
                        type="currentProduct"
                        process="Waiting For Approval"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#43A771"}
                        type="currentProduct"
                        process="Processing"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#009AE2"}
                        type="currentProduct"
                        process="Waiting For Payment"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#C13E3E"}
                        type="currentProduct"
                        process="Waiting For Approval"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#43A771"}
                        type="currentProduct"
                        process="Processing"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#009AE2"}
                        type="currentProduct"
                        process="Waiting For Payment"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#C13E3E"}
                        type="currentProduct"
                        process="Waiting For Approval"
                      />
                    </div>
                  </div>
                </Col> */}
              </Row>
            </div>
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default CurrentProducts;

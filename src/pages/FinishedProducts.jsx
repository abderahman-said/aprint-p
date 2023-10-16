
import React, { useState, useEffect } from "react";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import styles1 from "../styles/currentOrders/current.module.css";
import ServiceItem from "../components/ServiceItem";
import Loader from "../components/Loader";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "../styles/home/home.module.css";

const FinishedProducts = ({ lang }) => {
  const [servicesList, setServicesList] = useState([]);

  const onSuccess = (data) => {
    setServicesList(data.data.data.allProductOrders);
  };
  const onError = (error) => {
    console.log("Error", error);
  };

  const fetcher = () => {
    return axios.get(
      "https://dashboard.mobtkra-press.com/api/all/order/products/done",
      {
        headers: {
          lang: lang,
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
  }, []);
  return (
    <div>
      <Helmet title={lang === "ar" ? "الطلبات الحاليه " : "current orders"}>
        <section className={`${styles1.currentSection} py-5`}>
          <Container>
            <h3 className={styles1.heading}> الطلبات المنتهية ( منتجات )</h3>
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
                <Row>
                  {servicesList.map((item, index) => (
                    <Col key={index} lg="4" xl="4" className="mt-5">
                      <Link
                        to={`/currentOrders/status?n1=${item.Order_Status.id}&n2=${item.Order_id}`}
                        className={styles1.links}
                      >
                        <div className={`${styles1.serviceItemCont}`}>
                          <ServiceItem
                            service={item}
                            type="currentProduct"
                          />
                        </div>
                      </Link>
                    </Col>
                  ))}
                </Row>
              </div>
            )}
          </Container>
        </section>
      </Helmet>
    </div>
  );
};

export default FinishedProducts;

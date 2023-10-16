import React, { useState, useEffect } from "react";
import styles1 from "../styles/service/service.module.css";
import { Container } from "react-bootstrap";
import Helmet from "../components/Helmet";
import ServiceItem from "../components/ServiceItem";
import styles from "../styles/home/home.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import Loader from "../components/Loader";

const Service = ({ lang }) => {
  const { id } = useParams();
  const [services, setServices] = useState([]);
  const [mainName, setMainName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onServicesSuccess = (data) => {
    setServices(data.data.data.services);
    setMainName(data.data.data.name);
  };
  const onServicesError = (error) => {
    // console.log("Error", error);
  };
  const servicesFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/categories/${id}`, {
      params: {
        owner_type: 1,
      },
    });
  };
  const {
    isLoading: serviceLoading,
    error: servicesError,
    isFetching,
    refetch,
  } = useQueryHook(
    "subServices",
    onServicesSuccess,
    onServicesError,
    servicesFetcher,
    false
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    refetch();
  }, [refetch]);

  useEffect(() => {
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      //Axios request here
      const fetchData = async () => {
        await axios
          .get(`${process.env.REACT_APP_BACKEND_API}/categories/${id}`, {
            params: {
              owner_type: 1,
            },
          })
          .then((res) => {
            setServices(res.data.data);
          })
          .catch((error) => {
            console.log(error.response.data.errors);
          })
          .finally(() => setIsLoading(false));
      };

      if (searchTerm === "") {
        setIsLoading(false);
        refetch();
      } else {
        fetchData();
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, id, refetch]);
  if (!isFetching && mainName === "" && lang === "ar") {
    return (
      <p className="text-center text-danger mt-5" style={{ fontSize: "2rem" }}>
        No services Found
      </p>
    );
  }
  if (!isFetching && mainName === "" && lang === "en") {
    return (
      <p className="text-center text-danger mt-5" style={{ fontSize: "2rem" }}>
        there's no items here
      </p>
    );
  }
  return (
    <Helmet
      title={lang === "ar" ? `خدمات ${mainName}` : `${mainName} services`}
    >
      <section className={`${styles.serviceSection}`}>
        <Container>
          {/* <h3 className={`${styles1.heading} text-center mb-5 mt-5`}>
            {" "}
            كل خدمات {mainName}
          </h3>  */}
          <h3 className={`${styles1.heading} text-center mb-5 mt-5`}>
            Design Servises
          </h3>
          {/* <div className={styles1.mainServiceSearch}>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                marginTop: "-30px",
                border: "1px solid #1e96fc ",
                width: "96%",
                margin: "-30px auto 0px",
                display: "block",
              }}
              className="mb-4"
              type="search"
              placeholder={lang === "ar" ? "ابحث عن خدمه..." : "Search..."}
            />
          </div> */}
          {serviceLoading || isFetching || isLoading ? (
            <div className="mt-5">
              <Loader />
            </div>
          ) : servicesError ? (
            <p className="text-danger text-center display-4">
              something went wrong
            </p>
          ) : (
            <>
              <div className={`gap-3 ${styles.box}`}>
                {services.map((item, index) => (
                  <Link
                    to={`${item.id}`}
                    className={styles.servicesItem}
                    key={item.id}
                    style={{
                      cursor: "pointer",
                      color: "black",
                    }}
                  >
                    <ServiceItem service={item} type="subService" />
                  </Link>
                ))}
                {/* <div className={`${styles.servicesItem} ${styles.private}`}>
                  <Link
                    style={{
                      width: "100%",
                      height: "100%",
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                    to="/"
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        color: "#fff",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{ textAlign: "center", position: "relative" }}
                      >
                        <p style={{ margin: "0px", transition: "1s" }}>
                          Do you need Custom Service ?
                        </p>
                        <p
                          style={{
                            fontSize: "2rem",
                            margin: "0px",
                            transition: "1s",
                          }}
                        >
                          Order Your Service Now
                        </p>
                        <button
                          className={`${styles.orderNow} ${styles.orderPrivateBtn}`}
                          to="/"
                        >
                          Order
                        </button>
                      </div>
                    </div>
                  </Link>
                </div> */}
              </div>
            </>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default Service;

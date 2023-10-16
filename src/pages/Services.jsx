import React, { useState, useEffect } from "react";
import styles1 from "../styles/Services/services.module.css";
import styles from "../styles/home/home.module.css";
import ServiceItem from "../components/ServiceItem";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";
import Helmet from "../components/Helmet";
import axios from "axios";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import Loader from "../components/Loader";

const Services = ({ lang }) => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onServicesSuccess = (data) => {
    setServices(data.data.data);
  };
  const onServicesError = (error) => {
    // console.log("Error", error);
  };
  const servicesFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/categories`, {
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
    "servicesAll",
    onServicesSuccess,
    onServicesError,
    servicesFetcher,
    false
  );
  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [refetch]);
  // useEffect(() => {
  //   refetch();
  // }, [refetch]);

  useEffect(() => {
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      //Axios request here

      const fetchData = async () => {
        await axios
          .post(`${process.env.REACT_APP_BACKEND_API}/categories`, {
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
  }, [searchTerm, refetch]);

  // console.log(services);
  return (
    <Helmet title={"Services"}>
      <section className={`${styles1.Services} mt-5 minHeight`}>
        <Container>
          <h3 className={`${styles1.heading} text-center mb-5`}>
            {" "}
            Aprint Servises
          </h3>
          {/* <div className={styles1.mainServiceSearch}>
                    <input onChange={(e)=> setSearchTerm(e.target.value)} style = {{marginTop : "-30px" , border:"1px solid #1e96fc " , width : "96%" , margin : "-30px auto 0px" , display : "block"}} className='mb-4' type="search" placeholder={lang === 'ar' ? "ابحث عن خدمه...":"Search..."}/>
                    </div> */}
          {serviceLoading || isFetching || isLoading ? (
            <Loader />
          ) : servicesError ? (
            <p className="text-danger text-center display-4">
              something went wrong
            </p>
          ) : (
            <div className={`gap-3 ${styles.box}`}>
              {services.map((item, index) => (
                <Link
                  to={`${item.id}`}
                  style={{
                    cursor: "pointer",
                    color: "black",
                  }}
                  className={styles.servicesItem}
                  key={item.id}
                >
                  <ServiceItem service={item} type="service" />
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
                    <div style={{ textAlign: "center", position: "relative" }}>
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
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default Services;

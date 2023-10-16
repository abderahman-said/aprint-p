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

const SubProducts = ({ lang }) => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [mainName, setMainName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onProductsSuccess = (data) => {
    setProducts(data.data.data.products);
    setMainName(data.data.data.name);
  };
  const onProductsError = (error) => {
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
    "subProducts",
    onProductsSuccess,
    onProductsError,
    servicesFetcher,
    false
  );

  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [refetch]);

  useEffect(() => {
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      //Axios request here

      const fetchData = async () => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_API}/categories/${id}`, {
            params: {
              owner_type: 1,
            },
          })
          .then((res) => {
            setProducts(res.data.data);
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
        لا يوجد منتجات{" "}
      </p>
    );
  }
  if (!isFetching && mainName === "" && lang === "en") {
    return (
      <p className="text-center text-danger mt-5" style={{ fontSize: "2rem" }}>
        there's no products here
      </p>
    );
  }

  return (
    <Helmet
      title={lang === "ar" ? `منتجات ${mainName}` : `${mainName} products`}
    >
      <div className={styles1.subProduct}>
        <section className={`${styles1.serviceSection} minHeight`}>
          <Container>
            <h3 className={`${styles1.heading} text-center mb-5 mt-5`}>
              {" "}
              Sub Products
            </h3>
            {/* <h3 className={`${styles1.heading} text-center mb-5 mt-5`}>  كل منتجات {mainName}</h3> */}
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
                placeholder={lang === "ar" ? "ابحث عن منتج..." : "Search..."}
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
                  {products.map((item, index) => (
                    <Link
                      to={`${item.id}`}
                      style={{
                        cursor: "pointer",
                        color: "black",
                      }}
                      className={styles.servicesItem}
                      key={item.id}
                    >
                      <ServiceItem service={item} type="subProduct" />
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
                            Do you have Custom Product idea ?
                          </p>
                          <p
                            style={{
                              fontSize: "2rem",
                              margin: "0px",
                              transition: "1s",
                            }}
                          >
                            Make It Now
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
      </div>
    </Helmet>
  );
};

export default SubProducts;

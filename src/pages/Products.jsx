import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import styles from "../styles/home/home.module.css";
import axios from "axios";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import Helmet from "../components/Helmet";
import styles1 from "../styles/Services/services.module.css";
import productImage from "../assets/product.png";
const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onProductsSuccess = (data) => {
    setProducts(data.data.data);
  };
  const onProductsError = (error) => {
    // console.log("Error", error);
  };
  const productsFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/categories`, {
      params: {
        owner_type: 2,
      },
    });
  };
  const {
    isLoading: productLoading,
    error: productError,
    isFetching,
    refetch,
  } = useQueryHook(
    "productsAll",
    onProductsSuccess,
    onProductsError,
    productsFetcher,
    false
  );
  useEffect(() => {
    refetch();
    window.scrollTo(0, 0);
  }, [refetch]);
  // useEffect(() => {
  //   refetch();
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    const delayDebounceFn = setTimeout(() => {
      //Axios request here

      const fetchData = async () => {
        axios
          .get(`${process.env.REACT_APP_BACKEND_API}/categories`, {
            params: {
              owner_type: 2,
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
    }, 2000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, refetch]);
  return (
    <Helmet title={"products"}>
      <section className={`${styles1.Services} mt-5`}>
        <Container>
          <div
            className={`${styles.services_header} mb-3 d-flex align-items-center justify-content-between mt-4`}
          >
            <h3 className={`${styles1.heading} m-auto`}> Aprint Products</h3>
          </div>
          {/* <div className={styles1.mainServiceSearch}>
            <input
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                marginTop: "-30px",
                border: "1px solid #1e96fc ",
                width: "96%",
                margin: "30px auto 0px",
                display: "block",
              }}
              className="mb-4"
              type="search"
              placeholder={ "Search..."}
            />
          </div> */}
          {isFetching || productLoading || isLoading ? (
            <div className="mt-5">
              <Loader />
            </div>
          ) : productError ? (
            <p className="text-danger text-center display-4">
              something went wrong
            </p>
          ) : (
            <Row>
              {products.map((item, index) => (
                <Col lg="3" xl="3" md="4" className="p-1 mt-4" key={item.id}>
                  <Link
                    to={`${item.id}`}
                    style={{ textDecoration: "none" }}
                    className=""
                  >
                    <div className={styles.productItem}>
                      <img src={item.image} alt={item.name} />
                      <div
                        style={{
                          border: "1px solid #888",
                          padding: "15px 15px 2px 15px",
                          borderRadius: "0px 0px 15px 15px",
                        }}
                      >
                        <h3
                          style={{
                            fontSize: ".95rem",
                            fontWeight: "normal",
                            color: "#374958",
                          }}
                        >
                          {" "}
                          {item.name}
                        </h3>
                        <div className="d-flex">
                          <p style={{ color: "#1E96FC" }}>
                            {item.count} Products
                          </p>
                          <div
                            style={{ marginInlineStart: "auto" }}
                            className={`d-flex ali-align-items-center ${styles.parentHover}`}
                          >
                            <span
                              className={`${styles.gradient2}`}
                              style={{
                                marginTop: "1px",
                                textDecoration: "none",
                              }}
                            >
                              Discover
                            </span>
                            <span
                              className={`${styles.arrowCont} ${styles.arrowCont2}`}
                            >
                              <MdKeyboardArrowLeft />{" "}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Col>
              ))}
              {/* <Col lg="3" xl="3" className="p-1 mt-4">
                <Link to="/" style={{ textDecoration: "none" }}>
                  <div className="">
                    <div
                      className={`${styles.productItem1}`}
                      style={{ height: "38.3vh", borderRadius: "15px" }}
                    >
                      <div className={`${styles.content}`}>
                        <p
                          className="text-dark"
                          style={{ fontSize: ".9rem", marginBottom: "4px " }}
                        >
                          Do you Need Custom Product
                        </p>
                        <p className="text-dark">Make it Now</p>
                        <button className={`${styles.orderNow}`}>Order</button>
                      </div>
                    </div>
                  </div>
                </Link>
              </Col> */}
            </Row>
          )}
        </Container>
      </section>
    </Helmet>
  );
};

export default Products;

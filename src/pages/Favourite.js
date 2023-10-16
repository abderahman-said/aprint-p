import { MdKeyboardArrowLeft } from "react-icons/md";
import styles from "../styles/Favourite/Favourite.module.css";
import { Link } from "react-router-dom";
import productImage from "../assets/product.png";
import Helmet from "../components/Helmet";
const Favourite = () => {
  return (
    <Helmet title={"favourite"}>
      <div className="main_cont">
        <div className="container">
          <h1 className="main_title">Favorite Products</h1>
          <div className="row">
            <div className="col-md-4">
              <Link to={`/`} style={{ textDecoration: "none" }} className="">
                <div className={styles.productItem}>
                  <img src={productImage} alt="" />
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
                      Printing clothes and cotton
                    </h3>
                    <div className="d-flex">
                      <p style={{ color: "#1E96FC" }}>12 Products</p>
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
            </div>
            <div className="col-md-4">
              <Link to={`/`} style={{ textDecoration: "none" }} className="">
                <div className={styles.productItem}>
                  <img src={productImage} alt="" />
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
                      Printing clothes and cotton
                    </h3>
                    <div className="d-flex">
                      <p style={{ color: "#1E96FC" }}>12 Products</p>
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
            </div>
            <div className="col-md-4">
              <Link to={`/`} style={{ textDecoration: "none" }} className="">
                <div className={styles.productItem}>
                  <img src={productImage} alt="" />
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
                      Printing clothes and cotton
                    </h3>
                    <div className="d-flex">
                      <p style={{ color: "#1E96FC" }}>12 Products</p>
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
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Favourite;

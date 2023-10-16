import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/footer/footer.module.css";
import logo from "../assets/images/download/Group 64.png";
import { Link } from "react-router-dom";
import { IoLogoLinkedin } from "react-icons/io";
import { FaFacebookSquare } from "react-icons/fa";
import { BsTwitter } from "react-icons/bs";
import { CiInstagram } from "react-icons/ci";
const Footer = ({ lang, setLang }) => {
  return (
    <section className={styles.footer}>
      <Container>
        <div className={`${styles.footerContainer}`}>
          <div className={styles.class1} style={{ width: "45%" }}>
            <div
              className={`d-flex align-items-center  ${styles.FooterfristDiv}`}
            >
              <img className={`${styles.imgLogo}`} src={logo} alt="" />
              <div style={{ width: "36%", marginInlineStart: "20px" }}>
                <h5>Aprint Limited Liability Company</h5>
                <p style={{ fontSize: ".6rem" }}>
                  Aprint Limited Liability Company
                </p>
              </div>
            </div>
            <p
              className={styles.Footerinfo}
              style={{
                fontSize: ".8rem",
                width: "75%",
                lineHeight: "2",
                marginTop: "10px",
                color: "#B6B7CD",
              }}
            >
              This text is an example of other texts in addition to increasing
              the number of characters
            </p>
          </div>
          <div className={`${styles.middle} d-flex`} style={{ width: "50%" }}>
            <div>
              <h6>Home</h6>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <Link to="/">Services</Link>
                </li>
                <li>
                  <Link to="/">Products</Link>
                </li>
                <li>
                  <Link to="/"> Contact Us</Link>
                </li>
                <li>
                  <Link to="/">Aprint App</Link>
                </li>
              </ul>
            </div>
            <div>
              <h6> Aprint Services</h6>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <Link to="/"> Service Name Here</Link>
                </li>
                <li>
                  <Link to="/"> Service Name Here</Link>
                </li>
                <li>
                  <Link to="/"> Service Name Here</Link>
                </li>
                <li>
                  <Link to="/"> Service Name Here</Link>
                </li>
              </ul>
            </div>
            <div>
              <h6> Aprint Products</h6>
              <ul style={{ listStyle: "none" }}>
                <li>
                  <Link to="/"> Product Name Here</Link>
                </li>
                <li>
                  <Link to="/"> Product Name Here</Link>
                </li>
                <li>
                  <Link to="/"> Product Name Here</Link>
                </li>
              </ul>
            </div>
          </div>
          <div
            className={styles.last}
            style={{ width: "6.5%", textAlign: "center" }}
          >
            <h6 style={{ fontSize: ".9rem" }}> Find Us :</h6>
            <div className={` ${styles.linksContainer}`}>
              <div
                className={` ${styles.extra} d-flex align-items-center justify-content-between  pe-2`}
                style={{ marginTop: "36px" }}
              >
                <Link to="/">
                  <IoLogoLinkedin />
                </Link>
                <Link to="/">
                  {" "}
                  <FaFacebookSquare />
                </Link>
              </div>
              <div className="d-flex align-items-center justify-content-between  pe-2 mt-3">
                <Link to="/">
                  <BsTwitter />
                </Link>
                <Link to="/">
                  {" "}
                  <CiInstagram />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={`${styles.hr}`} />

        <div className={`${styles.footerContainer2}`}>
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              width: "35%",
              justifyContent: "space-between",
              marginTop: "25px",
            }}
          >
            <li>
              <Link className={`${styles.lastLink}`} to="/">
                Terms and Conditions
              </Link>
            </li>
            <li>
              <Link className={`${styles.lastLink}`} to="/">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link className={`${styles.lastLink}`} to="/">
                Connect with us
              </Link>
            </li>
          </ul>
          <div
            style={{
              width: "33%",
              marginTop: "7px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            {/* <select
              name="lang"
              id="lang"
              style={{
                backgroundColor: "transparent",
                padding: "0px 10px",
                border: "1px solid #fff",
                color: "#fff",
                borderRadius: "5px",
                width: "23%",
              }}
            >
              <option style={{ color: "#000" }} value="">
                العربيه
              </option>
              <option style={{ color: "#000" }} value="">
                English
              </option>
            </select> */}
            <p style={{ fontSize: ".75rem", width: "37%", marginTop: "10px" }}>
              Aprint All rights reserved
            </p>
            {/* <div className="d-flex align-items-center" style={{ width: "33%" }}>
              <div
                className="d-flex align-items-center justify-content-center"
                style={{ marginInlineStart: "30px" }}
              >
                <img className={`${styles.imgLogo2}`} src={logo} alt="" />
                <div style={{ marginInlineStart: "20px" }}>
                  <h5
                    className="mb-1"
                    style={{ fontSize: ".5rem", width: "100%" }}
                  >
                    شركة ألوان مبتكره للمنتـــجات الورقيه
                  </h5>
                  <p style={{ fontSize: ".3rem" }}>
                    صناعات ورقية طباعه تسويق اعلان
                  </p>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Footer;

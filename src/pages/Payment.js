import styles1 from "../styles/currentOrders/current.module.css";
import Helmet from "../components/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import card1 from "../assets/card1.png";
import card2 from "../assets/card2.png";
import card3 from "../assets/card3.png";
import card4 from "../assets/card4.png";
import icon4 from "../assets/icon4.png";
import icon5 from "../assets/icon5.png";
import icon6 from "../assets/icon6.png";
import icon7 from "../assets/icon7.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AddPayment, GetToCart } from "../store/ContactSlice";

const Payment = () => {
  const { CartArr, TotalPrice } = useSelector((state) => state.ContactSlice);
  // console.log(TotalPrice);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!CartArr) {
      dispatch(GetToCart());
    }
  }, [dispatch, CartArr]);
  const [number, setnumber] = useState("");
  const [exp_month, setexp_month] = useState("");
  const [exp_year, setexp_year] = useState("");
  const [cvc, setcvc] = useState("");
  const navigate = useNavigate();
  const SendPayment = () => {
    if (
      number.length > 0 &&
      exp_month.length > 0 &&
      exp_year.length > 0 &&
      cvc.length > 0
    ) {
      const data = {
        number: number,
        exp_month: parseInt(exp_month),
        exp_year: parseInt(exp_year),
        cvc: parseInt(cvc),
        amount: parseInt(TotalPrice),
      };
      dispatch(AddPayment(data))
        .unwrap()
        .then(() => {
          dispatch(GetToCart());
          setTimeout(() => {
            navigate("/currentProducts");
          }, 500);
        });
    }
  };
  return (
    <>
      <Helmet title={"Payment Options"}>
        <section className={`${styles1.currentSection} py-5`}>
          <Container>
            <h3 className={styles1.heading}> Payment Options</h3>

            <from>
              {/* <Row>
                <Col md={4}>
                  <div className={` ${styles1.CardPay}`}>
                    <div className={styles1.InputSec}>
                      <input
                        type="radio"
                        id="Master Card"
                        name="Visa Card"
                        value="Master Card"
                      />
                        <label for="Master Card">Master Card</label>
                    </div>
                    <Link to={"/"}>Edit Details</Link>
                  </div>
                  <div className={`${styles1.ImageContainer} `}>
                    <img className=" " src={card1} alt="Card" />
                  </div>
                </Col>
                <Col md={4}>
                  <div className={` ${styles1.CardPay}`}>
                    <div
                      className={styles1.InputSec}
                      style={{ marginBottom: "10px" }}
                    >
                      <input
                        type="radio"
                        id="Visa Card"
                        name="Visa Card"
                        value="Visa Card"
                      />
                        <label for="Visa Card">Visa Card</label>
                    </div>
                    <Link to={"/"}>Edit Details</Link>
                  </div>
                  <div className={`${styles1.ImageContainer} `}>
                    <img className=" " src={card2} alt="Card" />
                  </div>
                </Col>
                <Col md={4}>
                  <div className={` ${styles1.CardPay}`}>
                    <div
                      className={styles1.InputSec}
                      style={{ marginBottom: "10px" }}
                    >
                      <input
                        type="radio"
                        id="Visa Card2"
                        name="Visa Card"
                        value="Visa Card"
                      />
                        <label for="Visa Card2">Visa Card</label>
                    </div>
                    <Link to={"/"}>Edit Details</Link>
                  </div>
                  <div className={`${styles1.ImageContainer} `}>
                    <img className=" " src={card3} alt="Card" />
                  </div>
                </Col>
              </Row> */}
            </from>
            <div className={`${styles1.AddPay}`}>
              <Row>
                <Col md={6}>
                  <form>
                    <div className={styles1.FromSec}>
                      <label
                        style={{ fontSize: ".8rem" }}
                        htmlFor=""
                        className={`mb-1 `}
                      >
                        {" "}
                        <img
                          src={icon4}
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "15px",
                          }}
                          alt="  Details Of Service"
                        />
                        Card Number
                      </label>
                      {/* <br /> */}
                      <input
                        type="number"
                        value={number}
                        onChange={(e) => setnumber(e.target.value)}
                        placeholder="9876 000 0000 0000"
                      />
                    </div>
                    <div className={styles1.tinyInput}>
                      <div className={styles1.FromSec}>
                        <label
                          style={{ fontSize: ".8rem" }}
                          htmlFor=""
                          className={`mb-1 `}
                        >
                          {" "}
                          <img
                            src={icon5}
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "15px",
                            }}
                            alt="  Details Of Service"
                          />
                          cvc
                        </label>
                        {/* <br /> */}
                        <input
                          type="number"
                          value={cvc}
                          onChange={(e) => setcvc(e.target.value)}
                          placeholder="123"
                        />
                      </div>
                      <div className={styles1.FromSec}>
                        <label
                          style={{ fontSize: ".8rem" }}
                          htmlFor=""
                          className={`mb-1 `}
                        >
                          {" "}
                          <img
                            src={icon6}
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "15px",
                            }}
                            alt="  Details Of Service"
                          />
                          exp_month
                        </label>
                        {/* <br /> */}
                        <input
                          type="number"
                          value={exp_month}
                          onChange={(e) => setexp_month(e.target.value)}
                          placeholder="4"
                        />
                      </div>
                    </div>
                    <div className={styles1.FromSec}>
                      <label
                        style={{ fontSize: ".8rem" }}
                        htmlFor=""
                        className={`mb-1 `}
                      >
                        {" "}
                        <img
                          src={icon7}
                          style={{
                            width: "15px",
                            height: "15px",
                            marginRight: "15px",
                          }}
                          alt="  Details Of Service"
                        />
                        exp_year
                      </label>
                      {/* <br /> */}
                      <input
                        type="number"
                        value={exp_year}
                        onChange={(e) => setexp_year(e.target.value)}
                        placeholder="2027"
                      />
                    </div>
                  </form>
                </Col>
                <Col md={6}>
                  <div className={`${styles1.ImageContainer} text-center `}>
                    <img className=" " src={card4} alt="Card" />
                  </div>
                  <button className="main_btn" onClick={() => SendPayment()}>
                    Pay now
                  </button>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </Helmet>{" "}
    </>
  );
};

export default Payment;

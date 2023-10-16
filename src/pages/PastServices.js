import styles from "../styles/home/home.module.css";
import styles1 from "../styles/currentOrders/current.module.css";
import Helmet from "../components/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { IoIosArrowDropright } from "react-icons/io";
import ServiceItem from "../components/ServiceItem";

const PastServices = () => {
  const navigate = useNavigate();
  return (
    <>
      {" "}
      <Helmet title={"Past Products"}>
        <section className={`${styles1.currentSection} py-5`}>
          <Container>
            <Row className=" justify-content-between">
              <Col md={4}>
                <h3 className={styles1.heading}> Past orders</h3>
              </Col>
              <Col md={4}>
                <div
                  className={`d-flex align-items-center justify-content-center ${styles.Btns}`}
                >
                  <button
                    className={`main_btn ${styles.notActive}`}
                    onClick={() => {
                      navigate("/pastServices");
                    }}
                  >
                    Services
                  </button>
                  <button
                    className={`
                    main_btn_two ${styles.active}
                    `}
                    onClick={() => {
                      navigate("/pastProducts");
                    }}
                  >
                    Products
                  </button>
                </div>
              </Col>
              <Col md={4}>
                <div className={`text-center ${styles.arrow}`}>
                  <IoIosArrowDropright />
                </div>
              </Col>
            </Row>
            <div className={`${styles1.servicesContainer}`}>
              <Row>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#43A771"}
                        type="Past_order"
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
                        type="Past_order"
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
                        type="Past_order"
                        process="Waiting For Approval"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#C13E3E"}
                        type="Past_order"
                        process="Waiting For Approval"
                      />
                    </div>
                  </div>
                </Col>
                <Col lg="4" xl="4" className="mt-5">
                  <div className={styles1.links}>
                    <div className={`${styles1.serviceItemCont}`}>
                      <ServiceItem
                        backgroundColor={"#C13E3E"}
                        type="Past_order"
                        process="Waiting For Approval"
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
        </section>
      </Helmet>{" "}
    </>
  );
};

export default PastServices;

import styles1 from "../styles/currentOrders/current.module.css";
import Helmet from "../components/Helmet";
import { Col, Container, Row } from "react-bootstrap";
import ord1 from "../assets/ord1.png";
import ord2 from "../assets/ord2.png";
import ord3 from "../assets/ord3.png";
import ord4 from "../assets/ord4.png";
import ord5 from "../assets/ord5.png";
import { useParams } from "react-router-dom";
const TrackOrder = () => {
  const { id, id2 } = useParams();
  const data = [
    { id: 4, name: "Order Received", image: ord1 },
    { id: 5, name: "Order Designed", image: ord2 },
    { id: 6, name: "Order Manufactured", image: ord3 },
    { id: 7, name: "Order Processed", image: ord4 },
    { id: 8, name: "Delivered", image: ord5 },
  ];
  return (
    <>
      <Helmet title={"Current Orders"}>
        <section className={`${styles1.currentSection} py-5`}>
          <Container>
            <div className="d-flex align-items-center">
              <h3 className={styles1.heading}>Current Orders </h3>
              <p style={{ marginBottom: "0", marginLeft: "5px" }}>
                - Track Order Status
              </p>
            </div>
            <div className={styles1.PayBody}>
              <div className={styles1.ordrtId}>
                <h2 className={styles1.OrderId}> Order ID :</h2>
                <p className={` mb-2 ${styles1.wait}`}> {id2}</p>
              </div>
              <p>Order Progress</p>
              <div className={styles1.orderContainer}>
                {data
                  .filter((ele) => ele.id <= id)
                  .map((ele) => {
                    return (
                      <div className={styles1.order} key={ele.id}>
                        <div className={styles1.ordImage}>
                          <img src={ele.image} alt={ele.name} />
                        </div>
                        <div>
                          <h4>{ele.name}</h4>
                        </div>
                      </div>
                    );
                  })}

                {/* <div className={styles1.order}>
                  <div className={styles1.ordImage}>
                    <img src={ord2} alt="ord1" />
                  </div>
                  <div>
                    <h4>Order Designed</h4>
                  </div>
                </div>
                <div className={styles1.order}>
                  <div className={styles1.ordImage}>
                    <img src={ord3} alt="ord1" />
                  </div>
                  <div>
                    <h4>Order Manufactured</h4>
                  </div>
                </div>
                <div className={styles1.order}>
                  <div className={styles1.ordImage}>
                    <img src={ord4} alt="ord1" />
                  </div>
                  <div>
                    <h4>Order Processed</h4>
                  </div>
                </div>
                <div className={styles1.order}>
                  <div className={styles1.ordImage}>
                    <img src={ord5} alt="ord1" />
                  </div>
                  <div>
                    <h4>Delivered</h4>
                  </div>
                </div> */}
              </div>
            </div>
          </Container>
        </section>
      </Helmet>
    </>
  );
};

export default TrackOrder;

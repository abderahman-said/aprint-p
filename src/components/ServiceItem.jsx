import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import styles from "../styles/home/home.module.css";
import ServiceImg from "../assets/service.png";
import ProductImg from "../assets/product.png";
import { AiFillCheckCircle } from "react-icons/ai";
const ServiceItem = ({
  lang,
  service,
  type,
  backgroundColor,
  order_item,
  process,
}) => {
  const navigate = useNavigate();
  if (type === "Simmiler") {
    return (
      <>
        <img style={{ marginLeft: "-2px" }} src={ServiceImg} alt="" />
        <div
          className="p-3"
          style={{ fontSize: ".9rem", width: "-webkit-fill-available" }}
        >
          <h4 style={{ marginTop: "-4px" }}>Design</h4>
          <p className="mt-2 mb-3 text-secondary ">
            This text is an example that can be replaced in the same space.
          </p>
          <p className="mb-4" style={{ color: "#3E4F94" }}>
            (5) <span style={{ marginInlineStart: "3px" }}>Services</span>
          </p>
          {/* <Link to={`${service.id}`} className={`${styles.arrowCont}`}><MdKeyboardArrowLeft /></Link> */}
          <div
            style={{ marginInlineStart: "auto" }}
            className={`d-flex ali-align-items-center ${styles.parentHover}`}
          >
            <Link
              to={`/`}
              className={`${styles.gradient2}`}
              style={{ marginTop: "1px", textDecoration: "none" }}
            >
              Discover
            </Link>
            <Link
              to={`/`}
              className={`${styles.arrowCont} ${styles.arrowCont2}`}
            >
              <MdKeyboardArrowLeft />{" "}
            </Link>
          </div>
        </div>
      </>
    );
  } else if (type === "homePage") {
    return (
      <>
        <img
          style={{ marginLeft: "-2px" }}
          src={service.image}
          alt={service.name}
        />
        <div
          className="p-3"
          style={{ fontSize: ".9rem", width: "-webkit-fill-available" }}
        >
          <h4 style={{ marginTop: "-4px" }}> {service.name}</h4>
          <p className="mt-2 mb-3 text-secondary ">{service.description}</p>
          <p className="mb-4" style={{ color: "#3E4F94" }}>
            ({service.count}){" "}
            <span style={{ marginInlineStart: "3px" }}>Services</span>
          </p>
          {/* <Link to={`${service.id}`} className={`${styles.arrowCont}`}><MdKeyboardArrowLeft /></Link> */}
          <div
            style={{ marginInlineStart: "auto" }}
            className={`d-flex ali-align-items-center ${styles.parentHover}`}
          >
            <Link
              to={`/services/${service.id}`}
              className={`${styles.gradient2}`}
              style={{ marginTop: "1px", textDecoration: "none" }}
            >
              Discover
            </Link>
            <Link
              to={`/services/${service.id}`}
              className={`${styles.arrowCont} ${styles.arrowCont2}`}
            >
              <MdKeyboardArrowLeft />{" "}
            </Link>
          </div>
        </div>
      </>
    );
  } else if (type === "service") {
    return (
      <>
        <img style={{ marginLeft: "-2px" }} src={service.image} alt="" />
        <div
          className={styles.servInfoSec}
          style={{
            fontSize: ".9rem",
            padding: "10px",
            width: "-webkit-fill-available",
          }}
        >
          <h4 style={{ marginTop: "-4px", fontSize: "1.2rem" }}>
            {service.name}
          </h4>
          <p className="mt-2 mb-3 text-secondary ">{service.description}</p>
          <p className="mb-4" style={{ color: "#3E4F94" }}>
            ({service.count}){" "}
            <span style={{ marginInlineStart: "3px" }}>Services</span>
          </p>
          <div
            style={{ marginInlineStart: "auto" }}
            className={`d-flex ali-align-items-center ${styles.parentHover}`}
          >
            <Link
              to={`${service.id}`}
              className={`${styles.gradient2}`}
              style={{ marginTop: "1px", textDecoration: "none" }}
            >
              Discover
            </Link>
            <Link
              to={`${service.id}`}
              className={`${styles.arrowCont} ${styles.arrowCont2}`}
            >
              <MdKeyboardArrowLeft />{" "}
            </Link>
          </div>
        </div>
      </>
    );
  } else if (type === "subService") {
    return (
      <>
        <img style={{ marginLeft: "-2px" }} src={service.images[0]} alt="" />
        <div
          className="p-3"
          style={{
            fontSize: ".9rem",
            padding: "10px",
            width: "-webkit-fill-available",
          }}
        >
          <h4 style={{ marginTop: "-4px", fontSize: "1.2rem" }}>
            {service.name}
          </h4>
          <p
            className="mt-2 mb-3 text-secondary"
            style={{ width: "100% !important" }}
          >
            {" "}
            {service.description[0].substr(0, 80)}{" "}
          </p>
          <div
            style={{ marginInlineStart: "auto" }}
            className={`d-flex ali-align-items-center ${styles.parentHover}`}
          >
            <Link
              to={`${service.id}`}
              style={{ marginTop: "20px !important", textDecoration: "none" }}
              className={`${styles.gradient2} ${styles.not}`}
            >
              Discover
            </Link>
            <Link
              to={`${service.id}`}
              className={`${styles.arrowCont} ${styles.arrowCont2}`}
              style={{ marginTop: "auto" }}
            >
              <MdKeyboardArrowLeft />{" "}
            </Link>
          </div>
        </div>
      </>
    );
  } else if (type === "subProduct") {
    return (
      <div className={styles.productItem}>
        <img style={{ marginLeft: "-2px" }} src={service.images[0]} alt="" />
        <div
          className=""
          style={{
            fontSize: ".9rem",
            padding: "10px",
            width: "-webkit-fill-available",
          }}
        >
          <h4 style={{ marginTop: "-4px", fontSize: "1.2rem" }}>
            {service.title}
          </h4>
          <p
            className="mt-2 mb-3 text-secondary"
            style={{ width: "100% !important" }}
          >
            {" "}
            {service.description.substr(0, 70)}{" "}
          </p>
          <div
            style={{ marginInlineStart: "auto" }}
            className={`d-flex ali-align-items-center ${styles.parentHover}`}
          >
            <Link
              to={`${service.id}`}
              style={{ marginTop: "20px !important", textDecoration: "none" }}
              className={`${styles.gradient2} ${styles.not}`}
            >
              Discover
            </Link>
            <Link
              to={`${service.id}`}
              className={`${styles.arrowCont} ${styles.arrowCont2}`}
              style={{ marginTop: "auto" }}
            >
              <MdKeyboardArrowLeft />{" "}
            </Link>
          </div>
        </div>
      </div>
    );
  } else if (type === "subProduct2") {
    return (
      <>
        <img style={{ marginLeft: "-2px" }} src={service.image} alt="" />
        <div
          className=""
          style={{
            fontSize: ".9rem",
            padding: "10px",
            width: "-webkit-fill-available",
          }}
        >
          <h4 style={{ marginTop: "-4px", fontSize: "1.2rem" }}>
            {service.name}
          </h4>
          <p
            className="mt-2 mb-3 text-secondary"
            style={{ width: "100% !important" }}
          >
            {" "}
            {service.description.substr(0, 70)}{" "}
          </p>
          <div
            style={{ marginInlineStart: "auto" }}
            className={`d-flex ali-align-items-center ${styles.parentHover}`}
          >
            <Link
              to={`${service.id}`}
              style={{ marginTop: "20px !important", textDecoration: "none" }}
              className={`${styles.gradient2} ${styles.not}`}
            >
              Discover
            </Link>
            <Link
              to={`${service.id}`}
              className={`${styles.arrowCont} ${styles.arrowCont2}`}
              style={{ marginTop: "auto" }}
            >
              <MdKeyboardArrowLeft />{" "}
            </Link>
          </div>
        </div>
      </>
    );
  } else if (type === "cartItem") {
    return (
      <>
        <img style={{ marginLeft: "-2px" }} src={ServiceImg} alt="" />
        <div className="p-3" style={{ fontSize: ".9rem" }}>
          <h4 style={{ marginTop: "-4px", fontSize: "1.2rem" }}>
            {service.title}
          </h4>
          <p className="text-secondary">{service.category}</p>
        </div>
      </>
    );
  } else if (type === "currentServiceItem") {
    // var statusId = service.Order_Status.id;
    // var background = ``;
    // if (statusId === 1) {
    //   background = "#009AE2";
    // } else if (statusId === 2) {
    //   background = "#C13E3E";
    // } else if (statusId === 3) {
    //   background = "gold";
    // } else if (parseInt(statusId) >= 4) {
    //   background = "#43A771";
    // }
    return (
      <div
        className="currentProduct"
        onClick={() => {
          if (order_item.status === 2) {
            navigate(`/processing/${order_item.id}`);
          } else if (order_item.status === 3) {
            navigate(`/waitingForPayment/${order_item.id}`);
          } else if (order_item.status >= 4) {
            navigate(
              `/trackOrder/${order_item.status}/${order_item.code.substring(1)}`
            );
          }
        }}
        style={{ cursor: "pointer" }}
      >
        <div className="ImgCont">
          <img
            style={{ marginLeft: "-2px" }}
            src={order_item.service.image}
            alt=""
          />
        </div>

        <div className="info w-100 px-4 py-3">
          <div
            className=" d-flex w-100  align-items-center justify-content-between"
            style={{ fontSize: ".9rem" }}
          >
            <p> Order ID :</p>
            <p style={{ fontSize: ".9rem" }}>{order_item.code}</p>
          </div>
          {order_item.status >= 3 && (
            <div
              className="d-flex  align-items-center justify-content-between"
              style={{ fontSize: ".9rem", width: "100% !important" }}
            >
              <p> Order Amount :</p>
              <p style={{ fontSize: ".9rem" }}>{order_item.price}$</p>
            </div>
          )}

          <div
            className="w-100  px-3 py-2 text-white"
            style={{
              fontSize: ".9rem",
              textAlign: "center",
              borderRadius: "5px",
              background: backgroundColor,
            }}
          >
            {order_item.status === 1
              ? "Waiting For Approval"
              : order_item.status === 2
              ? "Rejected"
              : order_item.status === 3
              ? "Waiting For Payment"
              : order_item.status === 4
              ? "Pending"
              : order_item.status === 5
              ? "Sotring Statge"
              : order_item.status === 6
              ? "Impleminting Statge"
              : "Storage Statge"}
          </div>
        </div>
      </div>
    );
  } else if (type === "currentProduct") {
    // background = "#43A771";
    return (
      <div
        className="currentProduct"
        style={{ cursor: "pointer" }}
        // onClick={() => {
        //   navigate("/processing");
        // }}
      >
        <div className="ImgCont">
          <img style={{ marginLeft: "-2px" }} src={order_item.image} alt="" />
        </div>

        <div className=" info w-100  px-4 py-3">
          <div
            className=" d-flex w-100  align-items-center justify-content-between"
            style={{ fontSize: ".9rem" }}
          >
            <p> Order ID :</p>
            <p style={{ fontSize: ".9rem", color: "#3E4F94" }}>
              {order_item.code}
            </p>
          </div>
          <div
            className="d-flex  align-items-center justify-content-between"
            style={{ fontSize: ".9rem", width: "100% !important" }}
          >
            <p> Order Amount :</p>
            <p style={{ fontSize: ".9rem", color: "#3E4F94" }}>
              {order_item.price}$
            </p>
          </div>
          <div
            className="w-100  px-3 py-2 text-white"
            style={{
              fontSize: ".9rem",
              textAlign: "center",
              borderRadius: "5px",
              background:
                order_item.status === 4
                  ? "#43A771"
                  : order_item.status === 5
                  ? "#009AE2"
                  : order_item.status === 6
                  ? "green"
                  : "#C13E3E",
            }}
          >
            {order_item.status === 4
              ? "Pending"
              : order_item.status === 5
              ? "Sotring Statge"
              : order_item.status === 6
              ? "Impleminting Statge"
              : "Storage Statge"}
          </div>
        </div>
      </div>
    );
  } else if (type === "currentServiceItem2") {
    // statusId = service.Order_Status.id;
    // background = `green`;
    return (
      <>
        <img
          style={
            lang === "ar" ? { marginRight: "-2px" } : { marginLeft: "-2px" }
          }
          src={service.service_img}
          alt=""
        />

        <div className="w-100 px-4 py-3">
          <div
            className=" d-flex w-100  align-items-center justify-content-between"
            style={{ fontSize: ".9rem" }}
          >
            <p>الطلب رقم</p>
            <p style={{ fontSize: ".9rem", color: "#3E4F94" }}>
              ID{service.Order_id}
            </p>
          </div>
          <div
            className="d-flex  align-items-center justify-content-between"
            style={{ fontSize: ".9rem", width: "100% !important" }}
          >
            <p> سعر الطلب</p>
            <p style={{ fontSize: ".9rem", color: "#3E4F94" }}>
              {service.Order_price}
            </p>
          </div>
          <div
            className="w-75  px-3 py-2 text-white"
            style={{
              fontSize: ".9rem",
              textAlign: "center",
              borderRadius: "5px",
              background: backgroundColor,
            }}
          >
            {service.Order_Status.status}
          </div>
        </div>
      </>
    );
  } else if (type === "Past_order") {
    return (
      <div
        className="currentProduct"
        // style={{ cursor: "pointer" }}
        // onClick={() => {
        //   if (process === "Processing") {
        //     navigate("/processing");
        //   } else if (process === "Waiting For Payment") {
        //     navigate("/waitingForPayment");
        //   } else if (process === "Waiting For Approval") {
        //     navigate("/waitingForApprove");
        //   }
        // }}
      >
        <div className=" info w-100  px-4 py-3">
          <div
            className=" d-flex w-100  align-items-center justify-content-between"
            style={{ fontSize: ".9rem" }}
          >
            <p> Order ID :</p>
            <p style={{ fontSize: ".9rem", color: "#3E4F94" }}>ID124651</p>
          </div>
          <div
            className="d-flex  align-items-center justify-content-between"
            style={{ fontSize: ".9rem", width: "100% !important" }}
          >
            <p> Order Amount :</p>
            <p style={{ fontSize: ".9rem", color: "#3E4F94" }}>1250$</p>
          </div>
          <div
            className="d-flex  align-items-center justify-content-between"
            style={{ fontSize: ".9rem", width: "100% !important" }}
          >
            <p> Order Date :</p>
            <p style={{ fontSize: ".9rem", color: "#3E4F94" }}>20/03/2023</p>
          </div>
        </div>
        <div className="CheckIcon">
          <AiFillCheckCircle />
          <p>Completed</p>
        </div>
      </div>
    );
  }
};

export default ServiceItem;

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "../styles/home/home.module.css";
import Helmet from "../components/Helmet";
// import img1 from "../assets/images/hero/08_June_01.png";
// import img2 from "../assets/images/hero/180.png";
// import img3 from "../assets/images/hero/stationery-with-smartphone-mockup-top-view.png";
// import img4 from "../assets/images/hero/img4.png";
// import { heroData } from "../data/data";
import { Row, Col, Container } from "react-bootstrap";
// import whyImg1 from "../assets/images/why/1.png";
// import whyImg2 from "../assets/images/why/2.png";
// import whyImg3 from "../assets/images/why/3.png";
// import whyImg4 from "../assets/images/why/4.png";
// import circleImg from "../assets/images/why/kkkkkkkk-removebg-preview.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import deliveryImage from "../assets/images/why/delivery-truck.png";
import payment from "../assets/images/why/online-payment.png";
import checking from "../assets/images/why/checking.png";
import brush from "../assets/images/why/brush.png";

import { MdKeyboardArrowLeft } from "react-icons/md";
// import downImage1 from "../assets/images/download/Group 64.png";
// import mobileImg from "../assets/images/download/Clay_Mockup___17_.png";
import d1 from "../assets/images/download/svgexport-4.png";
import d2 from "../assets/images/download/svgexport-5.png";
import d3 from "../assets/images/download/svgexport-6.png";
import { FaWhatsapp } from "react-icons/fa";
import elipse1 from "../assets/images/contact/Mask Group.png";
import ServiceItem from "../components/ServiceItem";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import axios from "axios";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";
import Loader from "../components/Loader";
import { AiOutlineSearch } from "react-icons/ai";
import SwiperCards from "../components/Home/Brands";
import ClientsSwiper from "../components/Home/Clients";
// import productImg from "../assets/product.png";
// import SeviceImg from "../assets/service.png";
import AppImage from "../assets/app.png";
import { useDispatch, useSelector } from "react-redux";
import { SendContact } from "../store/ContactSlice";
import { getSearch } from "../store/HomeSlice";
const Home = ({ lang }) => {
  // const [data1, setData] = useState(heroData.english);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [Brands, setBrands] = useState([]);
  const [Clients, setClients] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [contactRes, setContactRes] = useState("");
  const [modalShowٍSuccess, setModalShowSuccess] = useState(false);
  const [options, setOprions] = useState([]);
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Need"),
    contactEmail: Yup.string().email("Worng").required("Need"),
    contactPhone: Yup.number().required("Need"),
    contactMessage: Yup.string().required("Need"),
  });

  const onServicesSuccess = (data) => {
    setServices(data.data.data.services);
    setProducts(data.data.data.products);
    setBrands(data.data.data.brands);
    setClients(data.data.data.clients);
    setOprions(data.data.data.options);
  };
  const onServicesError = (error) => {
    // console.log("Error", error);
  };
  const onProductsSuccess = (data) => {
    setProducts(data.data.data);
  };
  const onProductsError = (error) => {
    // console.log("Error", error);
  };
  const onContactSuccess = (data) => {
    setContactRes(data.data.status);
    setModalShowSuccess(true);
  };
  const onContactError = (error) => {
    console.log("Error", error);
    setModalShow(true);
  };
  const servicesFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/home`, {
      headers: {
        lang: lang === "ar" ? "ar" : "en",
      },
    });
  };
  // const productsFetcher = () => {
  //   return axios.get(
  //     "https://dashboard.mobtkra-press.com/api/all/main/product",
  //     {
  //       headers: {
  //         lang: lang === "ar" ? "ar" : "en",
  //       },
  //     }
  //   );
  // };
  const initialValues = {
    fullName: "",
    contactEmail: "",
    contactPhone: "",
    contactMessage: "",
  };
  const dispatch = useDispatch();
  const contactFetcher = (res) => {
    return axios.post(
      `${process.env.REACT_APP_BACKEND_API}/contacts`,
      {
        name: res.fullName,
        phone: res.contactPhone,
        email: res.contactEmail,
        message: res.contactMessage,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
  };
  const onSubmit = (res) => {
    const data = {
      name: res.fullName,
      phone: res.contactPhone,
      email: res.contactEmail,
      message: res.contactMessage,
    };
    dispatch(SendContact(data))
      .unwrap()
      .then(() => {
        window.location.reload();
      });
    // contactFetcher(values);
  };

  const {
    isLoading: serviceLoading,
    error: servicesError,
    refetch: servicesRe,
  } = useQueryHook(
    "services",
    onServicesSuccess,
    onServicesError,
    servicesFetcher
  );

  // const {
  //   isLoading: contactLoading,
  //   error: contactError,
  //   refetch,
  //   isFetching,
  // } = useQueryHook(
  //   "contact",
  //   onContactSuccess,
  //   onContactError,
  //   contactFetcher,
  //   false
  // );

  useEffect(() => {
    // if (lang === "ar") {
    //   setData(heroData.arabic);
    // } else {
    //   setData(heroData.english);
    // }
    servicesRe();
    // proRe();
  }, [servicesRe]);
  // const navigate = useNavigate();
  // const [DialogVisable, setDialogVisible] = useState(false);

  // const intervalIDRef = useRef(null);
  // const startTimer = useCallback(() => {
  //   intervalIDRef.current = setTimeout(() => {
  //     setDialogVisible(false);
  //   }, 1500);
  // }, []);
  // const stopTimer = useCallback(() => {
  //   clearInterval(intervalIDRef.current);
  //   setDialogVisible(false);
  //   intervalIDRef.current = null;
  // }, []);
  const [search, setSearch] = useState("");

  let typingTimer; //timer identifier
  let doneTypingInterval = 1000;
  const doneTyping = () => {
    dispatch(getSearch(search));
    setToggleSearch(true);
  };
  const { SearchArr } = useSelector((state) => state.HomeSlice);
  const [toggelSearch, setToggleSearch] = useState(false);
  // console.log(SearchArr);
  // useEffect(() => {
  //   return () => clearTimeout(intervalIDRef.current); // to clean up on unmount
  // }, []);

  const SerchResult =
    SearchArr &&
    SearchArr.slice(0, 5).map((ele) => {
      // const PathName = ele.title.replace(/\s/g, "-");
      return (
        <NavLink
          to={`${
            ele.type === "product"
              ? `/products/${ele.id}`
              : `/services/${ele.id}`
          }`}
          key={ele.id}
          className={styles.srarch_li}
          onClick={() => {
            setToggleSearch(false);
          }}
          // style={{
          //   direction: Cookies.get("MIgdir") === "true" ? "rtl" : "ltr",
          // }}
        >
          <p>{ele.title}</p>
          <img src={ele.image} alt={ele.name} width={100} height={60} />
        </NavLink>
      );
    });
  return (
    <Helmet title={"home"}>
      {/* <Button variant="primary" onClick={() => setModalShow(true)}>
        Launch vertically centered modal
      </Button> */}
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        header={lang === "ar" ? "! حدث خطأ" : "Error Occurred !"}
        body={
          lang === "ar"
            ? "لقد حدث خطأ يرجي المحاولة مرة اخري"
            : "Error Occurred please try agian later!"
        }
      />

      {contactRes && (
        <ModalMe
          show={modalShowٍSuccess}
          lang={lang}
          onHide={() => setModalShowSuccess(false)}
          body={contactRes}
        />
      )}
      <section className={styles.hero_section}>
        {/* <div className={styles.hero_images}>
          <img className={styles.img1} src={img1} alt="" />
          <img className={styles.img2} src={img2} alt="" />
          <img className={styles.img3} src={img3} alt="" />
          <img className={styles.img4} src={img4} alt="" />
        </div> */}
        <div className={styles.hero_content}>
          <h1 className={styles.mainHeading}>
            Do you Plan to create your own Branding and Identity ?!
            <br />
          </h1>
          <h2 className={styles.mainHeading2}>
            So you are in the right place APRINT
          </h2>
          {/* <button className={styles.orderBtn}> {data1.button}</button> */}
        </div>
        <div className={styles.Search}>
          <div className={`${styles.Search_section} ${styles.Search}`}>
            <AiOutlineSearch />
            <input
              value={search}
              type="search"
              placeholder="SEARCH  ... Find Out Our Products or Services"
              onChange={(e) => {
                setSearch(e.target.value);
                clearTimeout(typingTimer);
              }}
              onKeyUp={() => {
                // console.log(search);
                clearTimeout(typingTimer);
                typingTimer = setTimeout(doneTyping, doneTypingInterval);
              }}
            />
            <button>Search</button>
            <div className={styles.searchResult}>
              {search.length > 0 && SearchArr && toggelSearch && (
                <ul>{SerchResult}</ul>
              )}
            </div>
          </div>
        </div>
      </section>
      <div className="container1">
        <section className={styles.why} style={{ direction: "ltr" }}>
          <Container>
            <Row className={styles.row_direction}>
              <Col
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={6}
                className={styles.parentCircle}
              >
                {/* <div
                  className={styles.circle}
                  style={lang === "ar" ? { left: "55%" } : { right: "38%" }}
                >
                  <img src={circleImg} alt="" />
                </div> */}

                <div className="d-flex gap-4">
                  {options.slice(0, 2).map((ele) => {
                    return (
                      <div className={styles.imgContainer} key={ele?.id}>
                        <div className={styles.imgDiv1}></div>
                        <img src={ele?.image} alt="" />
                      </div>
                    );
                  })}
                </div>
                <div className="d-flex gap-4 mt-4">
                  {options.slice(2, 4).map((ele) => {
                    return (
                      <div className={styles.imgContainer} key={ele?.id}>
                        <div className={styles.imgDiv1}></div>
                        <img src={ele?.image} alt="" />
                      </div>
                    );
                  })}
                </div>
              </Col>
              <Col
                className={styles.secondWHY}
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={6}
              >
                <div>
                  <h2 className={styles.whyDesc}>
                    Why Aprint is your Best Option ?
                  </h2>
                  {options.map((ele) => {
                    return (
                      <p style={{ lineHeight: "2" }} key={ele?.id}>
                        {ele?.name}
                      </p>
                    );
                  })}

                  {/* <p style={{ lineHeight: "2" }}>
                    This text is an example that can be replaced in the same
                    space. This text has been generated from
                  </p>
                  <p style={{ lineHeight: "2" }}>
                    This text is an example that can be replaced in the same
                    space. This text has been generated from
                  </p>
                  <p style={{ lineHeight: "2" }}>
                    This text is an example that can be replaced in the same
                    space. This text has been generated from
                  </p> */}
                  {/* <div className={`${styles.btn_cont}`}>
                    <Link>
                      <button className={`main_btn text-center`}>
                        Discover More
                      </button>
                      <button className={`${styles.orderBtn} ${styles.create}`}>
                        انشاء حساب
                      </button>
                    </Link>
                  </div> */}
                </div>
              </Col>
            </Row>
            <div
              className={` ${styles.afterWhy} d-flex gap-5 justify-content-center`}
              style={{ marginTop: "100px" }}
            >
              <div className={styles.whyItem}>
                <div className={styles.img_cont}>
                  <img src={brush} alt="deliveryImage" />
                </div>
                <p className="mt-4"> Core Feature 3</p>
                <p className="text-secondary" style={{ fontSize: ".8rem" }}>
                  This text is an example that can be replaced in the same
                  space.{" "}
                </p>
              </div>
              <div className={styles.whyItem}>
                <div className={styles.img_cont}>
                  <img src={checking} alt="deliveryImage" />
                </div>
                <p className="mt-4"> Core Feature 3</p>
                <p className="text-secondary" style={{ fontSize: ".8rem" }}>
                  This text is an example that can be replaced in the same
                  space.{" "}
                </p>
              </div>
              <div className={styles.whyItem}>
                <div className={styles.img_cont}>
                  <img src={deliveryImage} alt="deliveryImage" />
                </div>
                <p className="mt-4"> Core Feature 3</p>
                <p className="text-secondary" style={{ fontSize: ".8rem" }}>
                  This text is an example that can be replaced in the same
                  space.{" "}
                </p>
              </div>
              <div className={styles.whyItem}>
                <div className={`${styles.img_cont} text-center`}>
                  <img
                    src={payment}
                    alt="deliveryImage "
                    className="text-center"
                  />
                </div>
                <p className="mt-4 text-center"> Core Feature 3</p>
                <p
                  className="text-secondary text-center"
                  style={{ fontSize: ".8rem" }}
                >
                  This text is an example that can be replaced in the same
                  space.{" "}
                </p>
              </div>
            </div>
          </Container>
        </section>
        <section
          className={styles.services}
          style={{ transition: "display 1s" }}
        >
          <Container>
            <div
              className={`${styles.services_header} w-100 d-flex align-items-center justify-content-between`}
            >
              <h3 className={`${styles.heading}`}>
                {" "}
                Aprint Services Categories{" "}
              </h3>
              <Link
                to="/services"
                style={{ color: "#3E4F94", marginInlineEnd: "32px" }}
              >
                {" "}
                See All Services
              </Link>
            </div>

            {serviceLoading ? (
              <Loader />
            ) : servicesError ? (
              <p className="text-danger text-center display-4">
                something went wrong
              </p>
            ) : (
              <div className={`gap-3 ${styles.box}`}>
                {services.map((item, index) => (
                  <Link
                    to={`/services/${item.id}`}
                    className={`${styles.servicesItem}`}
                    key={item.id}
                    style={{
                      cursor: "pointer",
                      color: "black",
                    }}
                  >
                    <ServiceItem service={item} type="homePage" />
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
                          Order Now
                        </button>
                      </div>
                    </div>
                  </Link>
                </div> */}
              </div>
            )}
          </Container>
        </section>

        <section className={styles.products}>
          <Container>
            <div
              className={`${styles.services_header} mb-3 d-flex align-items-center justify-content-between mt-4`}
            >
              <h3 className={`${styles.heading}`}>
                {" "}
                Aprint Products Categories
              </h3>
              <Link
                to="/products"
                style={{ color: "#3E4F94", marginInlineEnd: "32px" }}
              >
                {" "}
                See All Products
              </Link>
            </div>
            {serviceLoading ? (
              <Loader />
            ) : servicesError ? (
              <p className="text-danger text-center display-4">
                something went wrong
              </p>
            ) : (
              <Row>
                {products.map((item, index) => (
                  <Col
                    xs="12"
                    sm="12"
                    md="6"
                    lg="4"
                    xl="3"
                    className="p-1 mt-4"
                    key={index}
                  >
                    <Link
                      to={`/products/${item.id}`}
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
                            {item.name}
                          </h3>
                          <div className="d-flex">
                            <p style={{ color: "#1E96FC" }}>
                              ({item.count}) Products
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
                                Discover Products
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
                {/* <Col xs="6" sm="6" lg="4" xl="3" className="p-1 mt-4">
                  <Link
                    className={styles.Oredrnow}
                    to="/"
                    style={{ textDecoration: "none", height: "100%" }}
                  >
                    <div
                      className={`${styles.productItem1}`}
                      style={{ borderRadius: "15px", height: "100%" }}
                    >
                      <div className={`${styles.content}`}>
                        <p
                          className="text-dark"
                          style={{ fontSize: ".9rem", marginBottom: "4px " }}
                        >
                          Do you Need Custom Product
                        </p>
                        <p className="text-dark"> Make it Now</p>
                        <button className={`${styles.orderNow}`}>
                          Order Now
                        </button>
                      </div>
                    </div>
                  </Link>
                </Col> */}
              </Row>
            )}
          </Container>
        </section>

        <section className={`${styles.download}`}>
          <Container>
            <Row className={styles.row}>
              <Col lg="6" xl="6">
                <img
                  style={{ width: "113%", marginInlineStart: "-20px" }}
                  src={AppImage}
                  alt=""
                />
              </Col>
              <Col lg="6" xl="6">
                <div className={`${styles.content}`}>
                  <h3 className="mb-4 text-center">APrint App </h3>
                  <p
                    style={{
                      lineHeight: "2",
                      color: "#D4D5FF",
                      fontSize: ".9rem",
                    }}
                    className="text-center"
                  >
                    This text is an example that can be replaced in the same
                    space. This text has been generated from This text is an
                    example that can be replaced in the same space. This text
                    has been generated from This text is an example that can be
                    replaced in the same space. This text has been generated
                    from
                  </p>
                  <div>
                    <p
                      className="text-white mb-3 text-center"
                      style={{ marginTop: "60px" }}
                    >
                      Download Our App
                    </p>
                    <div className={styles.downloadApp}>
                      <Link to="/">
                        <img
                          className="ms-3"
                          style={{ width: "25%" }}
                          src={d3}
                          alt=""
                        />
                      </Link>

                      <Link to="/">
                        <img
                          className="ms-3"
                          style={{ width: "25%" }}
                          src={d2}
                          alt=""
                        />
                      </Link>
                      <Link to="/">
                        <img
                          src={d1}
                          className="ms-3"
                          alt=""
                          style={{ width: "25%" }}
                        />
                      </Link>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
        <section
          id="contact_us"
          className={`${styles.contact}`}
          style={{ background: "#fff" }}
        >
          <Container style={{ maxWidth: "100%", paddingInlineStart: "6.5%" }}>
            <Row>
              <Col lg="6" xl="6">
                <div className="mt-3">
                  <h4
                    style={{
                      textAlign: "center",
                      color: "#1E96FC",
                      marginBottom: "20px",
                    }}
                  >
                    Contact Us Now
                  </h4>
                  <p
                    style={{
                      textAlign: "center",
                      width: "86%",
                      margin: "auto",
                    }}
                  >
                    This text is an example that can be replaced in the same
                    space This text has been generated from This text has been
                    generated from
                  </p>
                  <div
                    className={`${styles.form}`}
                    style={{ marginTop: "50px" }}
                  >
                    {/* {(contactLoading || isFetching) && (
                      <div className={styles.formLoader}>
                        <Loader />
                      </div>
                    )} */}
                    <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={onSubmit}
                    >
                      {(formik) => {
                        return (
                          <Form className="mt-2">
                            <FormikControl
                              control="input"
                              type="text"
                              name="fullName"
                              placeholder=" Your Full Name Here"
                              label=" Full Name"
                            />
                            <FormikControl
                              control="input"
                              type="email"
                              name="contactEmail"
                              placeholder=" Write Email here ..."
                              label="Email "
                            />
                            <FormikControl
                              control="input"
                              type="phone"
                              name="contactPhone"
                              placeholder=" Write Email here ..."
                              label="Phone Number "
                            />
                            <FormikControl
                              control="textarea"
                              rows="5"
                              name="contactMessage"
                              placeholder="Write Your Message Here ..."
                              label="Your Message Here "
                            />
                            <input
                              type="submit"
                              className={` ${
                                !formik.isValid ? `${styles.disabled}` : ""
                              }  ${styles.main_btn}`}
                              disabled={!formik.isValid}
                              value="Send"
                            />
                          </Form>
                        );
                      }}
                    </Formik>
                  </div>
                </div>
              </Col>
              <Col lg="6" xl="6">
                {/* <div style={{ position: "relative" }}>
                  <img src={map} alt="" className={`${styles.map}`} />
                  <div className={`${styles.mapSmall}`} >
                    <p>اسم الشارع ورقم المدينه</p>
                    <p>اسم المكان والمدينه الداخليه</p>
                  </div>
                </div> */}
                <iframe
                  title="alwan location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6828.716721044884!2d31.398160275057606!3d31.155329475967285!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f770d658a47bf9%3A0xcd92daed79b518e2!2sMit%20Zunqur%2C%20Mit%20Zonqor%2C%20Talkha%2C%20Dakahlia%20Governorate!5e0!3m2!1sen!2seg!4v1668614792884!5m2!1sen!2seg"
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </Col>
            </Row>
          </Container>
        </section>

        <section className={`${styles.areYou}`}>
          <div className={`${styles.innerAreYou}`}>
            <p
              className="text-white"
              style={{ width: "52%", lineHeight: "1.9" }}
            >
              Do you have any service or any product that you want to print?
            </p>
            <p
              className="text-white"
              style={{ width: "52%", lineHeight: "1.9" }}
            >
              Contact us and we will do what you want as soon as possible
            </p>
            <div
              className={`${styles.btnsCintainerAre}w-50`}
              style={{
                margin: "0px auto 0px",
                position: "relative",
                zIndex: "2",
                marginTop: "2rem",
              }}
            >
              <Link className={`${styles.btn1}`} to="/">
                Contact Us
              </Link>
              <Link className={`${styles.btn2}`} to="/">
                <span style={{ marginInlineEnd: ".5rem" }}>
                  <FaWhatsapp />
                </span>
                <span>Whats App</span>
              </Link>
            </div>
            <img className={`${styles.elipse}`} src={elipse1} alt="" />
          </div>
        </section>
      </div>
      <div>
        <SwiperCards Brands={Brands} />
        <ClientsSwiper Clients={Clients} />
      </div>
    </Helmet>
  );
};

export default Home;

import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/cart/cart.module.css";
import Helmet from "../components/Helmet";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import axios from "axios";
import Loader from "../components/Loader";
import { Row, Col, Container } from "react-bootstrap";
import ServiceItem from "../components/ServiceItem";
import FormikControl from "./../components/formik/FormikControl";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles1 from "../styles/home/home.module.css";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
// import {  } from "react-redux";
import ModalMe from "../components/ModalMe";
import {
  AddPayment,
  DeleteFromcart,
  GetCpupon,
  GetToCart,
} from "../store/ContactSlice";

const Cart = ({ lang }) => {
  const [cartItems, setCartItems] = useState([]);
  const [data, setData] = useState([]);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [discountPer, setDiscount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [finalData, setFinalData] = useState([]);
  const [discountShow, setDiscountShow] = useState(false);
  const [isCopon, setIsCopon] = useState(false);
  const [coponErrors, setCoponsErrors] = useState([]);
  const [coponLoading, setCoponLoading] = useState(false);
  const [paymentSuccessMessage, setPaymentSuccessMessage] = useState("");
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [addressId, setAddressId] = useState(null);
  const [address, setAddress] = useState([]);

  const dispatch = useDispatch();
  const cartCount = useSelector((state) => state.cartCount.count);
  const coponRef = useRef();
  const navigate = useNavigate();

  let dataIds = [...data];
  const cartDataClone = [...cartItems];

  cartDataClone.forEach((item, index) => {
    dataIds.push({ product_id: item.id });
  });
  dataIds = dataIds.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.product_id === value.product_id)
  );

  let initialPrices = [];
  cartItems.forEach((item) => {
    initialPrices.push(0);
  });
  const [prices, setPrices] = useState(initialPrices);

  const onProductsSuccess = (data) => {
    setCartItems(data.data.data);
    // dispatch(cartActions.updateCount(data.data.data.allCarts.length));
  };
  const onProductsError = (error) => {
    // console.log("Error", error);
  };

  const onChange = (e) => {
    setAddressId(e.target.value);
    console.log(e.target.value);
  };
  const onAddressSuccess = (data) => {
    console.log(data.data.data.allAddress);
    setAddress(data.data.data.allAddress);
    setAddressId(data.data.data.allAddress[0].id);
  };
  const onAddressError = (error) => {
    console.log("Error", error);
  };

  const productsFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/card`, {
      headers: {
        Authorization: `Bearer  ${localStorage.getItem("ut")}`,
      },
    });
  };

  const addressFetcher = () => {
    return axios.get("https://dashboard.mobtkra-press.com/api/all/addresses", {
      headers: {
        lang: lang,
      },
    });
  };

  const {
    isLoading: productLoading,
    error: productError,
    isFetching,
    refetch,
  } = useQueryHook(
    "cartAllProducts",
    onProductsSuccess,
    onProductsError,
    productsFetcher,
    false
  );

  const {
    isLoading: AddressLoading,
    error: AddressError,
    isFetching: AddressFetching,
    refetch: AddressRefetch,
  } = useQueryHook(
    "address get",
    onAddressSuccess,
    onAddressError,
    addressFetcher,
    false
  );

  // useEffect(() => {
  //   refetch();
  //   // AddressRefetch();
  // }, []);

  // useEffect(() => {
  //   setTotalPrice(
  //     prices.reduce((acc, prev) => {
  //       prev = Number.isInteger(prev) ? prev : 0;
  //       return parseInt(acc) + parseInt(prev);
  //     }, 0)
  //   );
  // }, [prices]);

  const handleSelection = (e, id) => {
    dataIds.forEach((item, index) => {
      dataIds[id].price = parseInt(e.target.value);
      dataIds[id].quantity = parseInt(
        e.target.options[e.target.selectedIndex].text
      );
    });
    setData(dataIds);
    const pricesClone = [...prices];
    pricesClone[id] = parseInt(e.target.value);
    setPrices(pricesClone);
    setIsCopon(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    navigate("/payment");
    // console.log(cartItems);
    try {
      setIsPaymentLoading(true);
      const res = await axios.post(
        "https://dashboard.mobtkra-press.com/api/buy/products",
        {
          products: JSON.stringify(cartItems),
          address_id: parseInt(addressId),
          discountPercentage: parseInt(discountPer),
        },
        {
          headers: {
            lang: lang,
          },
        }
      );
      setPaymentSuccessMessage(res.data.status);
      setIsPaymentLoading(false);
      setPaymentModal(true);
      setTimeout(() => {
        navigate("/payment");
      }, 2000);
    } catch (e) {
      console.log(e);
      setIsPaymentLoading(false);
    }

    e.stopPropagation();
  };

  const handleDelete = async (pro_id) => {
    setDeleteLoading(true);
    // try {
    //   const res = await axios.post(
    //     "https://dashboard.mobtkra-press.com/api/delete/product/cart",
    //     {
    //       product_id: pro_id,
    //     },
    //     {
    //       headers: {
    //         lang: lang,
    //       },
    //     }
    //   );
    //   setDeleteLoading(false);
    //   window.location.reload();
    // } catch (err) {
    //   return console.log(err);
    // }
    dispatch(DeleteFromcart(pro_id))
      .unwrap()
      .then(() => {
        dispatch(GetToCart());
      });
  };

  const handleCopon = async (e) => {
    const copon = coponRef.current.value;

    try {
      setCoponLoading(true);
      const res = await axios.post(
        "https://dashboard.mobtkra-press.com/api/check/cobon",
        {
          cobon: copon,
        },
        {
          headers: {
            lang: lang,
          },
        }
      );
      setDiscount(parseInt(res.data.data.percentage));
      let sub = (parseInt(res.data.data.percentage) / 100) * totalPrice;
      let totalPrice1 = totalPrice - sub;
      setTotalPrice(totalPrice1);
      setIsCopon(false);
      setDiscountShow(true);
      setCoponLoading(false);
    } catch (e) {
      setCoponsErrors(e.response.data.errors);
      setCoponLoading(false);
    }
  };

  const { CartArr, TotalPrice } = useSelector((state) => state.ContactSlice);
  // console.log(TotalPrice);
  useEffect(() => {
    if (!CartArr) {
      dispatch(GetToCart());
    }
  }, [dispatch, CartArr]);

  const [discount, setCartDiscount] = useState("");

  return (
    <Helmet title={lang === "ar" ? "عربه التسوق" : "cart"}>
      <ModalMe
        show={paymentModal}
        lang={lang}
        onHide={() => setPaymentModal(false)}
        body={paymentSuccessMessage}
      />
      {/* {isFetching || productLoading || deleteLoading || isPaymentLoading ? (
        <div className="mt-5">
          <Loader />
        </div>
      ) : productError ? (
        <p className="text-danger text-center display-4">
          something went wrong
        </p>
      ) : ( */}
      <section className={`${styles.cartSection}`}>
        <Container>
          <h3 className={styles.heading}>Cart</h3>
          <form action="" onSubmit={onSubmit}>
            <Row>
              <Col lg="12" xl="12">
                <table className="border-0 mt-4">
                  <thead className={lang === "ar" ? `text-end` : `text-start`}>
                    <tr className="border-0">
                      <th className="">Products And Services Added</th>
                      <th>QTY</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody className="mt-4">
                    {CartArr?.map((item, index) => (
                      <tr key={item.id} className="mt-2">
                        <td className="w-50">
                          <Link>
                            <div
                              id={styles.serviceItem}
                              className={`${styles1.servicesItem} ${styles.serviceItem}`}
                              key={item.id}
                            >
                              <ServiceItem service={item} type="cartItem" />
                            </div>
                          </Link>
                        </td>
                        <td
                          className={lang === "ar" ? `text-end` : `text-start`}
                        >
                          <p className={styles.priceOf}>{item.quantity}</p>
                          {/* <select
                              required
                              name=""
                              id=""
                              onChange={(e) => handleSelection(e, index)}
                            >
                              <option value="">Select Quantity</option>
                              {item.product_quantity_price.map(
                                (item, index) => (
                                  <option key={index} value={item.price}>
                                    {item.quantity}
                                  </option>
                                )
                              )}
                            </select> */}
                        </td>
                        <td
                          className={
                            lang === "ar"
                              ? `text-end`
                              : `text-start ${
                                  lang === "ar" ? `text-end` : `text-start`
                                }`
                          }
                        >
                          <p className={styles.priceOf}>{item.price} $</p>
                        </td>
                        <td
                          className={`${styles.deleteTd} ${
                            lang === "ar" ? `text-end` : `text-start`
                          }`}
                          onClick={() => handleDelete(item.id)}
                        >
                          <MdOutlineDeleteOutline
                            onClick={() => handleDelete(item.id)}
                          />
                        </td>
                      </tr>
                    ))}
                    {/* <tr>
                        <td></td>
                        <td></td>
                        <td style={{borderTop : "1px solid #888" , width:"12%" , fontSize : ".8rem"}}>السعر الكلي 20 ر.س</td>
                    </tr> */}
                  </tbody>
                </table>
              </Col>
              <Col md={12}>
                <div>
                  <p className={styles.Total} style={{ fontSize: "1.1rem" }}>
                    Total {TotalPrice} $
                  </p>

                  {CartArr?.length > 0 && (
                    <input
                      type="submit"
                      value={"Pay Now"}
                      className="main_btninput"
                    />
                  )}
                </div>
              </Col>
              <Col md={12}>
                <div className="row text-center">
                  <div className="col-6">
                    <input
                      value={discount}
                      onChange={(e) => {
                        setCartDiscount(e.target.value);
                      }}
                      placeholder="Enter Coupon"
                      type="text"
                    />
                  </div>
                  <div className="col-6">
                    {" "}
                    <button
                      className="main_btn"
                      onClick={(e) => {
                        e.preventDefault();
                        // console.log("Hello");
                        dispatch(GetCpupon(discount));
                      }}
                    >
                      Add coupon
                    </button>
                  </div>
                </div>
              </Col>
              {/* <Col
                  lg="3"
                  xl="3"
                  style={{ display: "flex", marginTop: "40px" }}
                >
                  <div className={`${styles.leftSide}`}>
                    <div className="card">
                      <div
                        className="card-header text-white"
                        style={{
                          background:
                            "linear-gradient(to right, #1e96fc, #f72585)",
                        }}
                      >
                        الدفع
                      </div>
                      <div className="card-body">
                        <p className="text-dark">
                          بالضفط علي زر الدفع فأنت توافق على شروط التسليم
                        </p>
                        <h5 className="mb-3">ملخص الطلب :</h5>
                        <div
                          style={{ padding: "10px", border: "1px solid #9999" }}
                        >
                          <p
                            style={{ borderBottom: "1px solid #9999" }}
                            className="pb-2"
                          >
                            {cartCount} منتح
                          </p>
                          <div className="d-flex justify-content-between">
                            <p>سعر المنتجات</p>

                            <p>{totalPrice} ر.س</p>
                          </div>

                          <div
                            className="d-flex justify-content-between pt-2"
                            style={{ borderTop: "1px solid #9999" }}
                          >
                            <p
                              className="fw-bolder"
                              style={{ marginBottom: "0px !important" }}
                            >
                              {" "}
                              المجموع
                            </p>
                            <p
                              className="fw-bolder"
                              style={{ fontSize: "1.1rem" }}
                            >
                              {totalPrice} ر.س
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="px-3">
                        <label
                          style={{ display: "block", fontSize: ".8rem" }}
                          htmlFor="address"
                          className="mt-0 mb-1"
                        >
                          {lang === "ar"
                            ? "اختر عنوان التوصيل"
                            : "select delivery address"}
                        </label>
                        <select
                          required
                          className="w-75 mb-3"
                          style={{ fontSize: ".8rem" }}
                          name="address"
                          id=""
                          onChange={onChange}
                        >
                          <option value="">
                            {lang === "ar" ? "اختر عنوان" : "select address"}
                          </option>
                          {address.map((item, index) => (
                            <option key={index} value={item.id}>
                              {item.fullAddress}
                            </option>
                          ))}
                        </select>
                      </div>
                      {isCopon && (
                        <div className="px-3 mb-2">
                          {coponLoading ? (
                            <Loader width={"70%"} />
                          ) : (
                            <>
                              <p
                                style={{ display: "block", fontSize: ".8rem" }}
                                className="mb-0 mt-2"
                              >
                                هل لديك كوبون خصم ؟
                              </p>
                              <div
                                className={`${styles.form} d-flex justify-content-between`}
                              >
                                <input
                                  className={styles.copon}
                                  type="text"
                                  placeholder="ادخل الكوبون "
                                  ref={coponRef}
                                />
                                <div
                                  onClick={handleCopon}
                                  className={styles.coponBtn}
                                  style={{ width: "10% !important" }}
                                >
                                  أرسل
                                </div>
                              </div>
                              {coponErrors.map((item, index) => (
                                <p
                                  className="mt-1"
                                  style={{ fontSize: ".8rem", color: "red" }}
                                  key={index}
                                >
                                  {item}
                                </p>
                              ))}
                            </>
                          )}
                        </div>
                      )}

                      {discountShow && (
                        <div className="px-4">
                          <p className="mb-0">
                            تم خصم {discountPer} % من السعر الكلي
                          </p>
                        </div>
                      )}
                      {cartItems.length > 0 && (
                        <input
                          type="submit"
                          value={lang === "ar" ? "الدفع الآن" : "pay now"}
                        />
                      )}
                    </div>
                  </div>
                </Col> */}
            </Row>
          </form>
        </Container>
      </section>
      {/* )} */}
    </Helmet>
  );
};

export default Cart;

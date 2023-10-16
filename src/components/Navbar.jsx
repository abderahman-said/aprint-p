import React, { useState, useRef, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
// import { AiOutlineSearch, AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
// import { IoIosArrowDown, IoIosNotificationsOutline , IoNotificationsOutline } from "react-icons/io";
import { HiMenu, HiOutlineShoppingCart } from "react-icons/hi";
// import { BsEnvelope, BsHeart } from "react-icons/bs";
import logo from "../assets/images/logo2.png";
import { useOutSide } from "./custom_hooks/Outside";
import styles from "../styles/navbar/navbar.module.css";
// import { BiHeart, BiSearch } from "react-icons/bi";
import { RiArrowDownSFill } from "react-icons/ri";
import { navbarData } from "../data/data";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { cartActions } from "../store/cartSlice";
import { useQueryHook } from "./custom_hooks/UseQueryHook";
// import ButtonGroup from "react-bootstrap/ButtonGroup";
// import ToggleButton from "react-bootstrap/ToggleButton";
// import { MdOutlineNotificationsActive } from "react-icons/md";
import { GetToCart } from "../store/ContactSlice";

const Navbar = ({ user, lang, setLang, isUser }) => {
  const [data, setData] = useState(navbarData.english);

  const dispatch = useDispatch();
  // const cartCount = useSelector((state) => state.cartCount.count);
  // const [noti, setNoti] = useState([]);
  // const [isNoti, setIsNoti] = useState(false);
  // const radios = [
  //   { name: "Ar", value: "1" },
  //   { name: "En", value: "2" },
  // ];
  // const [radioValue, setRadioValue] = useState("1");

  // const onProductsSuccess = (data) => {
  //   dispatch(cartActions.updateCount(data.data.data.allCarts.length));
  // };
  // const onProductsError = (error) => {
  //   // console.log("Error", error);
  // };

  // const productsFetcher = () => {
  //   return axios.get(
  //     "https://dashboard.mobtkra-press.com/api/all/product/carts",
  //     {
  //       headers: {
  //         lang: lang,
  //       },
  //     }
  //   );
  // };

  // const {
  //   isLoading: productLoading,
  //   error: productError,
  //   isFetching,
  //   refetch,
  // } = useQueryHook(
  //   "cartAllProducts",
  //   onProductsSuccess,
  //   onProductsError,
  //   productsFetcher,
  //   false
  // );
  // const onNotiSuccess = (data) => {
  //   setNoti(data.data.data);
  // };
  // const onNotiError = (error) => {
  //   // console.log("Error", error);
  // };

  // const notiFetcher = () => {
  //   return axios.get(
  //     "https://dashboard.mobtkra-press.com/api/all/notifications",
  //     {
  //       headers: {
  //         lang: lang,
  //       },
  //     }
  //   );
  // };

  // const {
  //   isLoading: notiLoading,
  //   error: notiError,
  //   isFetching: notiFetching,
  //   refetch: notiRefetch,
  // } = useQueryHook("noti", onNotiSuccess, onNotiError, notiFetcher, false);
  // useEffect(() => {
  //   if (isUser) {
  //     // refetch();
  //     notiRefetch();
  //   }
  // }, [isUser, notiRefetch]);

  // useEffect(() => {
  //   if (lang === "ar") {
  //     setData(navbarData.english);
  //   } else {
  //     setData(navbarData.english);
  //   }
  // }, [lang]);
  const [userPopup, setUserPopup] = useState(false);
  const [isMenu, setIsMenu] = useState(false);
  const wrapperRef = useRef(null);
  const openPopupBtnRef = useRef(null);
  const navUlRef = useRef(null);

  const handleUserProfile = () => {
    setUserPopup((userPopup) => !userPopup);
  };
  const handlePopClick = () => {
    setUserPopup(false);
  };

  const openMenu = () => {
    navUlRef.current.style.marginLeft = "0%";
  };
  // const closeMenu = () => {
  //   navUlRef.current.style.marginRight = "-45%";
  // };

  useOutSide(wrapperRef, { call: setUserPopup, otherRef: openPopupBtnRef });

  useEffect(() => {
    let handleResize = () => {
      if (window.innerWidth <= 1024) {
        setIsMenu(true);
      } else {
        setIsMenu(false);
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("load", handleResize);
    };
  });

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (
        navUlRef.current &&
        !navUlRef.current.contains(event.target) &&
        window.innerWidth <= 1024
      ) {
        if (window.innerWidth <= 499) {
          navUlRef.current.style.marginLeft = "-60%";
        } else if (window.innerWidth <= 768) {
          navUlRef.current.style.marginLeft = " -40%";
        } else {
          navUlRef.current.style.marginLeft = " -25%";
        }
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navUlRef, lang]);

  // const handleLangClick = (e) => {
  //   if (e.target.classList.contains("btn-outline-danger")) {
  //     setLang("ar");
  //   } else {
  //     setLang("en");
  //   }
  // };

  // const handleNoti = () => {
  //   setIsNoti((prev) => !prev);
  // };
  const { CartArr } = useSelector((state) => state.ContactSlice);

  useEffect(() => {
    if (!CartArr) {
      dispatch(GetToCart());
    }
  }, [dispatch, CartArr]);
  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <div className={`${styles.right}`}>
          <div className={styles.logo}>
            <Link to="/">
              {" "}
              {/* Aprint */}
              <img src={logo} alt="logo_img" />{" "}
            </Link>
          </div>
          {isMenu && (
            <div className={`${styles.menubar} me-md-2`} onClick={openMenu}>
              <HiMenu fontSize={"40px"} />
            </div>
          )}
          <div className={styles.nav_ul}>
            <ul ref={navUlRef}>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? styles.active : "inactive"
                  }
                >
                  {data.links.link1}
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? styles.active : "inactive"
                  }
                >
                  {data.links.link2}
                </NavLink>
              </li> */}
              <li>
                <NavLink
                  to="/services"
                  className={({ isActive }) =>
                    isActive ? styles.active : "inactive"
                  }
                >
                  {data.links.link3}
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/products"
                  className={({ isActive }) =>
                    isActive ? styles.active : "inactive"
                  }
                >
                  {data.links.link4}
                </NavLink>
              </li>
              {/* <li>
                <NavLink
                  to="/4"
                  className={({ isActive }) =>
                    isActive ? styles.active : "inactive"
                  }
                >
                  {data.links.link5}
                </NavLink>
              </li> */}
              {/* <li>
                <NavLink
                  to="/5"
                  className={({ isActive }) =>
                    isActive ? styles.active : "inactive"
                  }
                >
                  {data.links.link6}
                </NavLink>
              </li> */}
              <li>
                <NavLink to="/contact">{data.links.link7}</NavLink>
              </li>
            </ul>
          </div>
        </div>
        {isUser ? (
          <div className={styles.left}>
            <div className={styles.links}>
              {/* <div className={`${styles.langContainer}`} dir="ltr">
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "outline-primary" : "outline-danger"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                      size="sm"
                      onClick={(e) => handleLangClick(e)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </div> */}

              {/* <Link
                className={`${styles.cartContainer} mt-1`}
                onClick={() => handleNoti()}
              >
                <div className={styles.car} style={{ top: "-2px !important" }}>
                  {noti.length}
                </div>
                <MdOutlineNotificationsActive />
                {isNoti && (
                  <div
                    className={styles.notiContainer}
                    style={lang === "ar" ? { left: "0%" } : { right: "0%" }}
                  >
                    {noti.length === 0 ? (
                      <p className="text-center">
                        {lang === "ar"
                          ? "لا يوجد اشعارات"
                          : "there's notifications"}
                      </p>
                    ) : (
                      <div>
                        <button className={styles.closeBtn}>X</button>
                        <p
                          className="text-center"
                          style={{ fontSize: "1.5rem" }}
                        >
                          {lang === "ar" ? "الاشعارات" : "notifications"}
                        </p>
                        <div>
                          {noti.map((item, index) => (
                            <div
                              key={index}
                              className="d-flex align-content-center"
                              style={{
                                borderBottom: "1px solid #9999",
                                padding: "20px 20px",
                              }}
                            >
                              <img
                                className="ms-3"
                                width="40"
                                height="40"
                                src={item.notification_img}
                                alt=""
                              />
                              <div>
                                <p className="mb-1 text-secondary">
                                  {item.notification_text}
                                </p>
                                <p className="text-secondary mb-0">
                                  {item.created_at}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </Link> */}
              <Link to="/cart" className={`${styles.cartContainer}`}>
                <div className={styles.car}>{CartArr ? CartArr.length : 0}</div>
                <HiOutlineShoppingCart />
              </Link>
              {/* <Link className={styles.heart} to="/favorite">
                <BiHeart />
                <div className={styles.dot}></div>
              </Link> */}
            </div>
            <div className={styles.user_container}>
              {user.image && (
                <img
                  style={{ borderRadius: "50%" }}
                  className={styles.user_img}
                  src={user.image}
                  alt=""
                />
              )}

              <button
                className={`${styles.userBtn} me-lg-1`}
                onClick={handleUserProfile}
                ref={openPopupBtnRef}
              >
                <RiArrowDownSFill />
              </button>

              {userPopup && (
                <div
                  className={styles.user_popup}
                  style={{ right: "8%" }}
                  dir="rtl"
                  ref={wrapperRef}
                  onClick={handlePopClick}
                >
                  <Link to="/Profile">
                    <div> User profile</div>
                  </Link>
                  <Link to="/currentOrders">
                    <div>Current Services Order </div>
                  </Link>
                  <Link to="/finishedServices">
                    <div> Past Services Order</div>
                  </Link>
                  <Link to="/currentProducts">
                    <div> Current Producst Order</div>
                  </Link>
                  <Link to="/finishedPRoducts">
                    <div> Past Products Orders</div>
                  </Link>
                  <Link to="/address">
                    <div>Addresses</div>
                  </Link>
                  <Link to="/Profile">
                    <div> Favourite</div>
                  </Link>
                  <Link to="/logout" className="last">
                    <div>Logout</div>
                  </Link>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className={styles.left}>
            {/* <div
              style={{ marginInlineEnd: "30px" }}
              className={`${styles.langContainer}`}
              dir="ltr"
            >
              <ButtonGroup>
                {radios.map((radio, idx) => (
                  <ToggleButton
                    key={idx}
                    id={`radio-${idx}`}
                    type="radio"
                    variant={idx % 2 ? "outline-primary" : "outline-danger"}
                    name="radio"
                    value={radio.value}
                    checked={radioValue === radio.value}
                    onChange={(e) => setRadioValue(e.currentTarget.value)}
                    size="sm"
                    onClick={(e) => handleLangClick(e)}
                  >
                    {radio.name}
                  </ToggleButton>
                ))}
              </ButtonGroup>
            </div> */}
            <Link
              to="login"
              style={{ textDecoration: "none" }}
              className={"main_btn ms-1"}
            >
              Login
            </Link>
            <Link
              to="login"
              style={{ textDecoration: "none" }}
              className={"main_btn_two ms-3"}
            >
              Create Account
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;

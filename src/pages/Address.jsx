import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import styles from "../styles/address/address.module.css";
import { Container, Row, Col } from "react-bootstrap";
import { CiUser } from "react-icons/ci";
import { AiFillHome, AiOutlinePhone } from "react-icons/ai";
import { GiModernCity } from "react-icons/gi";
import { FiMap } from "react-icons/fi";
import { BiHome } from "react-icons/bi";
import axios from "axios";
import { useQueryHook } from "./../components/custom_hooks/UseQueryHook";
import Loader from "../components/Loader";
import ModalMe from "../components/ModalMe";
import { useNavigate } from "react-router-dom";
import { BsFillPersonFill, BsTelephone } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { DeleteAddress, UpdateDefult } from "../store/ContactSlice";

const Address = ({ user, lang }) => {
  const [address, setAddress] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [loginErrors, setLoginErrors] = useState();
  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();

    var formData = new FormData(e.target);
    let data = {};
    for (var pair of formData.entries()) {
      let key = pair[0];
      let value = pair[1];
      data[key] = value;
    }

    setIsLoading(true);
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_API}/addresses`,
        {
          phone: data.phone,
          details: data.details,
          label: data.label,
          type: data.type,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      )
      .then((res) => {
        setModalShow1(true);
        setSuccessMessage(res.data.message);
        refetch();
        setModalShow(false);
      })
      .catch((error) => {
        setLoginErrors(error.response.data.errors);
      })
      .finally(() => setIsLoading(false));
  };

  const addressForm = () => {
    if (isLoading) {
      return (
        <div>
          {" "}
          <Loader />{" "}
        </div>
      );
    }

    return (
      <form action="" onSubmit={onSubmit}>
        <h5 className="text-center mt-2">{"Add New Address "}</h5>
        <div className=" d-flex align-items-center">
          <select
            required
            name="type"
            className="mt-4 "
            id=""
            style={{
              border: "none",
              background: "#f1f1f2",
              padding: "4px 10px",
              color: "#888",
              borderRadius: "5px",
              marginRight: "10px",
            }}
          >
            <option value="">
              <div>Type</div>{" "}
            </option>
            <option value="1">Home</option>
            <option value="2">Work</option>
          </select>
          <input
            required
            className="mt-4"
            name="label"
            type="text"
            placeholder={"Address"}
          />
        </div>

        <input
          required
          className="mt-4"
          name="details"
          type="text"
          placeholder={" Details"}
        />
        <input
          required
          className="mt-4"
          name="phone"
          type="text"
          placeholder={" Phone No"}
        />
        <input
          className="mb-3 main_btninput"
          required
          type="submit"
          value={"Add Address"}
        />
      </form>
    );
  };

  const getAddressSucc = (data) => {
    setAddress(data.data.data);
  };
  const getAddressErr = (error) => {
    // console.log("Error", error);
  };

  const addressFetcher = () => {
    return axios.get(`${process.env.REACT_APP_BACKEND_API}/addresses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("ut")}`,
      },
    });
  };

  const {
    isLoading: addressLoading,
    error: addressError,
    isFetching: addressFetching,
    refetch,
  } = useQueryHook(
    "getAddress",
    getAddressSucc,
    getAddressErr,
    addressFetcher,
    false
  );

  useEffect(() => {
    refetch();
  }, []);
  const dispatch = useDispatch();
  return (
    <Helmet title={"addresses"}>
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        body={addressForm()}
        type="addAddress"
      />
      <ModalMe
        show={modalShow1}
        lang={lang}
        onHide={() => setModalShow1(false)}
        // header={}
        body={successMessage}
      />
      <section className={`${styles.addressSection}`}>
        <Container>
          <div className="d-flex justify-content-between align-items-center">
            <h3 className={`${styles.heading} mb-3 mt-1`}> Addresses </h3>
            <button
              className={`${styles.addNewAddress} main_btninput`}
              onClick={() => setModalShow(true)}
            >
              Add New Address
            </button>
          </div>
          <div>
            {/* <div className="mb-1">
              <div className="d-flex align-items-center">
                <CiUser color="#1E96FC" />
                <p className="mb-0 me-2"> احمد محمد علي</p>
              </div>
              <div className="d-flex align-items-center">
                <AiOutlinePhone color="#1E96FC" />
                <p className="mb-0 me-2"> 0123124124</p>
              </div>
            </div> */}
            {addressFetching || addressLoading ? (
              <div className="mt-5">
                <Loader />
              </div>
            ) : addressError ? (
              <p className="text-danger text-center display-4">
                something went wrong
              </p>
            ) : (
              <Row>
                {address.length > 0 &&
                  address.map((item, index) => (
                    <Col
                      key={item.id}
                      xs="12"
                      md="6"
                      lg="6"
                      xl="6"
                      className="mt-5"
                    >
                      {/* <p className="me-1">عنوان رقم {index + 1}</p> */}
                      <div className={`${styles.addressContainer}`}>
                        <div className="d-flex justify-content-between align-items-center">
                          <p
                            className="mb-4 me-4"
                            style={{ fontSize: "1.3rem" }}
                          >
                            {" "}
                            {item.type === 1 ? "Home" : "Phone"}
                          </p>
                          <div
                            className="d-flex align-items-center justify-content-end"
                            style={{ flexBasis: "50%", margin: 0 }}
                          >
                            <label
                              for="Default"
                              style={{ marginRight: "5px", marginTop: "0" }}
                            >
                              Make It Default
                            </label>
                            <input
                              style={{ flexBasis: "10%", margin: 0 }}
                              type="radio"
                              id="Default"
                              name="fav_language"
                              checked={item.is_default}
                              value={item.is_default}
                              onChange={() => {
                                // console.log(item.id);
                                dispatch(UpdateDefult(item.id))
                                  .unwrap()
                                  .then(() => {
                                    window.location.reload();
                                  });
                              }}
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-between  align-items-end">
                          <div>
                            <div className="d-flex align-items-center mb-2">
                              <BiHome
                                color="#1E96FC"
                                style={{ fontSize: "1.15rem" }}
                              />
                              <p className="mb-0 me-2"> {item.details} </p>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <BsFillPersonFill color="#1E96FC" />
                              <p className="mb-0 me-2"> {item.details}</p>
                            </div>
                            <div className="d-flex align-items-center mb-2">
                              <BsTelephone color="#1E96FC" />
                              <p className="mb-0 me-2"> {item.phone}</p>
                            </div>
                          </div>
                          <button
                            className={`main_btn_two ${styles.EditBtn}`}
                            style={{ color: "white", background: "red" }}
                            onClick={() => {
                              dispatch(DeleteAddress(item.id))
                                .unwrap()
                                .then(() => {
                                  window.location.reload();
                                });
                            }}
                          >
                            Delete Address{" "}
                          </button>
                        </div>
                      </div>
                    </Col>
                  ))}
              </Row>
            )}
          </div>
        </Container>
      </section>
    </Helmet>
  );
};

export default Address;

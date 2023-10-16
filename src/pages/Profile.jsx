import React, { useState, useEffect } from "react";
import styles from "../styles/profile/profile.module.css";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import { BiUser, BiLockAlt } from "react-icons/bi";
import { BsEnvelope, BsTelephone, BsTelephoneFill } from "react-icons/bs";
import { AiOutlinePhone } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import ModalMe from "../components/ModalMe";
import { COUNTRIES } from "../data/data";
import Loader from "../components/Loader";
import { useDispatch } from "react-redux";
import { UpdateProfile } from "../store/ContactSlice";

const Profile = ({ user, lang }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [modalShow1, setModalShow1] = useState(false);
  const [modalShow2, setModalShow2] = useState(false);
  const [content, setContent] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loginErrors, setLoginErrors] = useState([]);

  const [file_Image, setFileImage] = useState(null);
  const dispatch = useDispatch();
  const renderSingleEdit = (
    name,
    type,
    p_ar,
    p_en,
    label,
    submitHandler,
    extra
  ) => {
    // console.log(extra);

    if (extra === "pass") {
      return (
        <form onSubmit={(e) => submitHandler(e, name)}>
          <label
            className="text-center"
            style={{ display: "block" }}
            htmlFor={name}
          >
            {label}
          </label>
          <input
            type={type}
            name={"oldPassword"}
            placeholder={
              lang === "ar" ? " ادخل كلمة المرور القديمه" : "enter old password"
            }
            id={"oldPassword"}
            required
          />
          <input
            type={type}
            name={"newPassword"}
            placeholder={
              lang === "ar" ? "ادخل كلمة المرور الجديده" : "enter new password"
            }
            id={"newPassword"}
            required
          />
          <input
            type={type}
            name={"password_confirmation"}
            placeholder={
              lang === "ar" ? "اعد ادخال كلمة المرور" : "re enter password"
            }
            id={"password_confirmation"}
            required
          />

          <input type="submit" value={"send"} />
        </form>
      );
    } else if (extra === "phone") {
      return (
        <form onSubmit={(e) => submitHandler(e, name)}>
          <label
            className="text-center"
            style={{ display: "block" }}
            htmlFor={name}
          >
            {label}
          </label>

          {/* <label
            className="text-secondary ms-3"
            style={{ fontSize: ".8rem" }}
            htmlFor=""
          >
            {lang === "ar" ? "اختر كود الدولة" : "select country code"}
          </label>
          <select
            className="mt-1 "
            style={{ border: "1px solid #888", color: "#888" }}
            name="phoneKey"
            id=""
            required
          >
            <option value="">{"select country"}</option>
            {COUNTRIES.map((item, index) => (
              <option key={index} value={item.mobileCode}>
                {item.name}
              </option>
            ))}
          </select> */}

          <input
            type={"text"}
            name={"phone"}
            placeholder={
              lang === "ar" ? "ادخل رقم الهاتف الجديد" : "enter new phone"
            }
            id={"phone"}
            required
            className="mt-3"
          />

          <input type="submit" value={"send"} />
        </form>
      );
    } else if (type === "email2") {
      return (
        <form onSubmit={(e) => submitHandler(e, "mail2")}>
          <label
            style={{ display: "block" }}
            className="text-center mb-3"
            htmlFor={"email"}
          >
            {label}
          </label>
          <input
            type={type}
            name={"email"}
            placeholder={lang === "ar" ? p_ar : p_en}
            id={"email"}
            required
          />
          <input
            required
            type="text"
            name="otp"
            id="otp"
            placeholder={"write code"}
          />
          <input type="submit" value="send" />
        </form>
      );
    } else if (type === "file") {
      return (
        <form onSubmit={(e) => submitHandler(e, "img")}>
          <label
            style={{ display: "block" }}
            className="text-center"
            htmlFor={name}
          >
            {lang === "ar" ? "تغيير الصورة الشخصيه" : "change profile picture"}
          </label>

          <label htmlFor="newImage">
            {lang === "ar" ? "اختر الصوره الجديده" : "select new picture"}
          </label>
          <input
            type={"file"}
            name={"newImage"}
            id={"newImage"}
            multiple={true}
            onChange={(e) => {
              setFileImage(e.target.files[0]);
              console.log(e.target.files[0]);
              const formData5 = new FormData();
              formData5.append("image", e.target.files[0]);
              formData5.append("_method", "put");

              dispatch(UpdateProfile(formData5))
                .unwrap()
                .then(() => {
                  window.location.reload();
                });
            }}
          />

          {/* <button
            onClick={(e) => {
              e.preventDefault();
              const formData5 = new FormData();
              formData5.append("image", file_Image);
              formData5.append("_method", "put");
              console.log(file_Image);
              dispatch(UpdateProfile(formData5))
                .unwrap()
                .then(() => {});
            }}
          >
            send
          </button> */}
        </form>
      );
    }
    return (
      <form onSubmit={(e) => submitHandler(e, name)}>
        <label
          style={{ display: "block" }}
          className="text-center"
          htmlFor={name}
        >
          {label}
        </label>
        <input
          type={type}
          name={name}
          placeholder={lang === "ar" ? p_ar : p_en}
          id={name}
          required
        />
        <input type="submit" value={"send"} />
      </form>
    );
  };

  const handleClick1 = () => {
    const content = renderSingleEdit(
      "name",
      "text",
      "اكتب الاسم الجديد",
      "write new name",
      "تغيير اسم المستخدم",
      onSubmit
    );
    setContent(content);
    setModalShow(true);
  };
  const handleClick2 = () => {
    const content = renderSingleEdit(
      "password",
      "password",
      " كلمة السر القديمه",
      " old password",
      "تغيير  كلمة السر",
      onSubmit,
      "pass"
    );
    setContent(content);
    setModalShow(true);
  };
  const handleClick3 = () => {
    const content = renderSingleEdit(
      "phone",
      "text",
      "phone ",
      "phone",
      "تغيير رقم الهاتف",
      onSubmit,
      "phone"
    );
    setContent(content);
    setModalShow(true);
  };
  const handleClick4 = () => {
    const content = renderSingleEdit(
      "email",
      "email",
      " ادخل البريد الجديد",
      "enter new email",
      "تغيير البريد الالكتروني",
      onSubmit,
      "email"
    );
    setContent(content);
    setModalShow(true);
  };
  const handleClick5 = () => {
    const content = renderSingleEdit(
      "newImage",
      "file",
      "",
      " ",
      "",
      onSubmit,
      "file"
    );
    setContent(content);
    setModalShow(true);
  };

  const onSubmit = async (e, type) => {
    console.log(type);
    e.preventDefault();
    var formData = new FormData(e.target);
    let data = {};
    for (var pair of formData.entries()) {
      let key = pair[0];
      let value = pair[1];
      data[key] = value;
    }
    // setIsLoading(true);
    var varURL = `${
      process.env.REACT_APP_BACKEND_API
    }/users/${localStorage.getItem("ui_Ap")}`;
    if (type === "email") {
      // varURL = `${process.env.REACT_APP_BACKEND_API}/change-email`;
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/change-email`,
          { ...data },
          {
            headers: {
              // lang: lang,
              Authorization: localStorage.getItem("ut"),
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setSuccessMessage(res.data.success);
          const content2 = renderSingleEdit(
            "email2",
            "email2",
            " Enter Email",
            "enter new email",
            "Enter Code",
            onSubmit,
            "email2"
          );
          setContent(content2);
          setModalShow(true);
        });
    } else if (type === "mail2") {
      await axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/verify-email`,
          { ...data },
          {
            headers: {
              // lang: lang,
              Authorization: localStorage.getItem("ut"),
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setSuccessMessage(res.data.message);
          setModalShow(false);
        });
    } else if (type === "img") {
      var formData2 = new FormData();
      formData2.append("image", file_Image);
      formData2.append("_method", "put");
      // const Data = {
      //   image: file,
      //   _method: "put",
      // };
      // console.log(Data);
      await axios
        .post(varURL, formData2, {
          headers: {
            // lang: lang,
            "Content-Type": "multipart/form-data",
            Authorization: localStorage.getItem("ut"),
            Accept: "application/json",
          },
        })
        .then((res) => {
          setSuccessMessage(res.data.status);
          // if (type === "email") {
          //   varURL = `${process.env.REACT_APP_BACKEND_API}/change-email`;
          //   const content = renderSingleEdit(
          //     "email",
          //     "email2",
          //     " ادخل البريد الجديد",
          //     "enter new email",
          //     "ادخال كود التفعيل",
          //     onSubmit,
          //     "email2"
          //   );
          //   setSuccessMessage(content);
          //   setContent(content);
          // }
          setModalShow(true);
          // setModalShow(false);
          // if (type !== "email") {
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 1000);
          // }
        })
        .catch((error) => {
          if (error.response.data.errors)
            setLoginErrors(error.response.data.errors);
          setModalShow2(true);
          //   setModalShow(false);
        })
        .finally(() => setIsLoading(false));
    } else {
      await axios
        .post(varURL, {
          ...data,
          _method: "put",
        })
        .then((res) => {
          setSuccessMessage(res.data.status);
          if (type === "email") {
            const content = renderSingleEdit(
              "mail",
              "email2",
              "enter new email",
              "enter new email",
              "Entyer Code",
              onSubmit,
              "email2"
            );
            setSuccessMessage(content);
            setContent(content);
          }
          // setModalShow(true);
          setTimeout(() => {
            window.location.reload();
          }, 1000);
          setModalShow(false);
          // if (type !== "email") {
          //   setTimeout(() => {
          //     window.location.reload();
          //   }, 1000);
          // }
        })
        .catch((error) => {
          if (error.response.data.errors)
            setLoginErrors(error.response.data.errors);
          setModalShow2(true);
          //   setModalShow(false);
        })
        .finally(() => setIsLoading(false));
    }
  };
  return (
    <Helmet title={"profile"}>
      <ModalMe
        show={modalShow}
        lang={lang}
        onHide={() => setModalShow(false)}
        body={isLoading ? <Loader /> : content}
        type="addAddress"
      />
      <ModalMe show={modalShow1} lang={lang} body={successMessage} />
      <ModalMe
        show={modalShow2}
        lang={lang}
        onHide={() => setModalShow2(false)}
        body={loginErrors.map((item, index) => (
          <p key={index} className="text-danger">
            {item}
          </p>
        ))}
      />
      <section className={`${styles.profile}`}>
        <div className={styles.hero}>
          <div className={styles.img}>
            <div className={styles.hover} onClick={handleClick5}>
              <FiEdit color="#fff" />
            </div>
            <img src={user.image} alt="" />
            <h4 className="mt-3">{user.name}</h4>
          </div>
        </div>
        <div className={styles.info}>
          <Container>
            <div className={` ${styles.all} px-5 mt-4`}>
              <p className="mb-2" style={{ color: "#374958" }}>
                Personal Details
              </p>
              <Row>
                <Col lg="6" xl="6" className="p-3">
                  <div
                    className={` ${styles.inputs} bg-white rounded-1 pe-2 ps-4 d-flex align-items-center`}
                  >
                    <BiUser style={{ fontSize: "1.3rem" }} />
                    <p className="mb-0 me-2" style={{ color: "#999" }}>
                      {lang === "ar" ? "الاسم بالكامل" : "Full Name"}
                    </p>
                    <p className="mt-3 me-5" style={{ color: "#1E96FC" }}>
                      {user.name}
                    </p>
                    <FiEdit
                      onClick={handleClick1}
                      className={styles.lastIcon}
                    />
                  </div>
                </Col>
                <Col lg="6" xl="6" className="p-3">
                  <div
                    className={` ${styles.inputs} bg-white rounded-1 pe-2 ps-4 d-flex align-items-center`}
                  >
                    <BiLockAlt style={{ fontSize: "1.3rem" }} />
                    <p className="mb-0 me-2" style={{ color: "#999" }}>
                      {lang === "ar" ? "تغيير كلمة المرور" : "Password"}
                    </p>
                    <p
                      className={`${styles.password} mt-3 me-5`}
                      style={{ color: "#1E96FC" }}
                    >
                      **********
                    </p>
                    <FiEdit
                      onClick={handleClick2}
                      className={styles.lastIcon}
                    />
                  </div>
                </Col>
                <Col lg="6" xl="6" className="p-3">
                  <div
                    className={` ${styles.inputs} bg-white rounded-1 pe-2 ps-4 d-flex align-items-center`}
                  >
                    <BsTelephone
                      style={{
                        fontSize: "1.3rem",
                      }}
                    />
                    <p className="mb-0 me-2" style={{ color: "#999" }}>
                      {lang === "ar" ? "  رقم الهاتف" : "Phone No"}
                    </p>
                    <p
                      className={`${styles.phone} mt-3 me-5`}
                      style={{ color: "#1E96FC" }}
                      dir="ltr"
                    >
                      {user.phone}
                    </p>
                    <FiEdit
                      onClick={handleClick3}
                      className={styles.lastIcon}
                    />
                  </div>
                </Col>
                <Col lg="6" xl="6" className="p-3">
                  <div
                    className={` ${styles.inputs} bg-white rounded-1 pe-2 ps-4 d-flex align-items-center`}
                  >
                    <BsEnvelope style={{ fontSize: "1.3rem" }} />
                    <p className="mb-0 me-2" style={{ color: "#999" }}>
                      {lang === "ar" ? " البريد الالكتروني " : "Email"}
                    </p>
                    <p
                      className={`${styles.email} mt-3 me-5`}
                      style={{ color: "#1E96FC" }}
                      dir="ltr"
                    >
                      {user.email}
                    </p>
                    <FiEdit
                      onClick={handleClick4}
                      className={styles.lastIcon}
                    />
                  </div>
                </Col>
              </Row>
            </div>
          </Container>
          <Container style={{ marginTop: "30px" }}>
            <Row className=" justify-content-center align-items-center">
              <Col md={2}>
                <button className={styles.Save}>Save Changes</button>
              </Col>
              <Col md={2}>
                <button className={styles.Invoices}>My Invoices</button>
              </Col>
            </Row>
          </Container>
        </div>
      </section>
    </Helmet>
  );
};

export default Profile;

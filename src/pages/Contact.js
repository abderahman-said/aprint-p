import { Form, Formik } from "formik";
import { Col, Container, Row } from "react-bootstrap";
import FormikControl from "../components/formik/FormikControl";
import styles from "../styles/home/home.module.css";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { SendContact } from "../store/ContactSlice";
const Contact = () => {
  const initialValues = {
    fullName: "",
    contactEmail: "",
    contactPhone: "",
    contactMessage: "",
  };
  const validationSchema = Yup.object({
    fullName: Yup.string().required("Need"),
    contactEmail: Yup.string().email("Worng").required("Need"),
    contactPhone: Yup.number().required("Need"),
    contactMessage: Yup.string().required("Need"),
  });
  const dispatch = useDispatch();
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
  return (
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
                This text is an example that can be replaced in the same space
                This text has been generated from This text has been generated
                from
              </p>
              <div className={`${styles.form}`} style={{ marginTop: "50px" }}>
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
  );
};

export default Contact;

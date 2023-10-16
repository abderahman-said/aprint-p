import React, { useEffect, useState } from "react";
import { useSearchParams  , useNavigate} from "react-router-dom";
import Loader from "../components/Loader";
import { useQueryHook } from "../components/custom_hooks/UseQueryHook";
import axios from "axios";
import { Link } from "react-router-dom";
import Helmet from "../components/Helmet";
import { Container, Row, Col } from "react-bootstrap";
import styles from "../styles/buyService/buyService.module.css";
import FormikControl from './../components/formik/FormikControl';
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import ModalMe from "../components/ModalMe";

const ServicesStatus = ({ lang }) => {
  const [searchParams] = useSearchParams();
  const status_id = searchParams.get("n1");
  const order_id = searchParams.get("n2");
  const [servideData, setServiceData] = useState([{ Order_Status: "" }]);
  const [address , setAddress ] = useState([]); 
  const [addressId , setAddressId] = useState(null);
  const [errorModal , setErrorModl] = useState(false);
  const [acceptModel , setAcceptModel] = useState(false);
  const [errorMessage , setErrorMessage] = useState("");
  const status = [
    // {id : 1 , name_ar : "في انتظار الموافقة" , name_en :"Waiting for approval" },
    // {id : 2 , name_ar : "تم الرفض" , name_en :"rejected" },
    // {id : 3 , name_ar : "  تم الموافقة وملعق لحين الدفع" , name_en :"It is approved and pending payment" },
    {id : 4 , name_ar : "تم استلام الطلب" , name_en :"order received" },
    {id : 5 , name_ar : "مرحلة الفرز" , name_en :" screening stage" },
    {id : 6 , name_ar : "مرحلة التنفيذ  " , name_en :"  Implementation stage" },
    {id : 7 , name_ar : "مرحلة التخزين  " , name_en :"  storage stage" },
    {id : 8 , name_ar : "مرحلة التسليم  " , name_en :"  delivery stage" },
  ]
  const filteredStatus = status.filter((item , index)=>(
    item.id <= status_id
  ))
  

  const navigate = useNavigate();

  const initialValues = { 
    a: "",
  };
  const validationSchema = Yup.object({
    
  });
  const onSubmit = (values) => {
    acceptedRefetch()
  };
  const onChange = (e) => {
    setAddressId(e.target.value);
  };

  const onSuccess = (data) => {
    const all = data.data.data.allServiceOrders;
    const filtered = all.filter((item) => item.Order_id === order_id);
    setServiceData(filtered);
  };
  const onError = (error) => {
    
  };
  const onAddressSuccess = (data) => {
    setAddress(data.data.data.allAddress);
  };
  const onAddressError = (error) => {
    console.log("Error", error);
  };
  const onSuccessAccepted = (data) => {
    setAcceptModel(true);
   setTimeout(() => {
    navigate('/currentOrders')
   }, 1500);
  };
  const onErrorAccepted = (error) => {
    setErrorMessage(lang === 'ar' ?"حدث خطأ ما" :"Something went wrong" )
    setErrorModl(true)
  };

  const fetcher = () => {
    return axios.get(
      "https://dashboard.mobtkra-press.com/api/all/order/services",
      {
        headers: {
          lang: lang,
        },
      }
    );
  };
  const fetcherAccepted = () => {
    return axios.post(
      "https://dashboard.mobtkra-press.com/api/buy/service",{
        order_id : parseInt(order_id),
        address_id : parseInt(addressId),
        service_price :100
      },
      {
        headers: {
          lang: lang,
        },
      }
    );
  };
  const addressFetcher = () => {
    return axios.get(
      "https://dashboard.mobtkra-press.com/api/all/addresses",
      {
        headers: {
          lang: lang,
        },
      }
    );
  };
  const {
    isLoading: serviceLoading,
    error: servicesError,
    isFetching,
    refetch,
  } = useQueryHook("addCart", onSuccess, onError, fetcher, false);
  const {
    isLoading: accepetedLoading,
    error: acceptedError,
    isFetching : acceptedFetching,
    refetch : acceptedRefetch,
  } = useQueryHook("acceptedPayment", onSuccessAccepted, onErrorAccepted, fetcherAccepted, false);
  const {
    isLoading: AddressLoading,
    error: AddressError,
    isFetching : AddressFetching,
    refetch : AddressRefetch,
  } = useQueryHook("address get", onAddressSuccess, onAddressError, addressFetcher, false);

  useEffect(() => {
    refetch();
    AddressRefetch()
  }, []);


  if (serviceLoading || isFetching) {
    return (
      <Helmet title={lang === "ar" ? "تفاصيل شراء الخدمه" : "service status"}>
        <div className="mt-5">
          <Loader />
        </div>
      </Helmet>
    );
  }

  if (status_id === "1") {
    return (
      <div className="text-center mt-5 text-danger">
        <h3 style={{ fontSize: "3rem" }}>
          {servideData[0].Order_Status.status} ...
        </h3>
      </div>
    );
  } else if (status_id === "2") {
    return (
      <div className="text-center mt-5">
        <h3 style={{ display: "inline-block" }} className="text-danger ms-2">
          تم رفض الطلب يرجي اعاده ارساله مره اخري من{" "}
        </h3>

        <Link to={`/services/10/${servideData[0].service_id}`}> من هنا</Link>
      </div>
    );
  } else if (status_id === "3") {
    return (
      <section className={`${styles.buyProductSection}`} style={{background : "#F0F0F0" , marginTop : "10px", paddingTop : "10px" , paddingBottom : "100px"}}>
        <ModalMe
        show={errorModal}
        lang={lang}
        onHide={() => setErrorModl(false)}
        body={errorMessage}
      />
        <ModalMe
        show={acceptModel}
        lang={lang}
        onHide={() => setAcceptModel(false)}
        body={lang === 'ar' ? "تمت الدفع بنجاح":"payment done"}
      />
        {(accepetedLoading || acceptedFetching) && <div  className='d-flex justify-content-center align-items-center' style={{height : "100%" ,width : "100%" , position :"fixed" , top :"0" , left : "0" , backgroundColor : "rgba(0,0,0,0.8)" }}><Loader /></div>}
        <h3
          className={`${styles.heading} text-center`}
          style={{ marginTop: "50px", marginBottom: "70px" }}
        >
          {" "}
          {servideData[0].service_name}
        </h3>
        <Container>
          <Row>
            <Col lg="6" xl="6" >
              <div>
                <img className="w-75" src={servideData[0].service_img} alt="" />
              </div>
            </Col>
            <Col lg="6" xl="6" className="py-5" style={{ marginInlineStart : "-80px"}}>
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <p className="text-success">
                    {" "}
                    {lang === "ar"
                      ? " تم الموافقة علي طلبك وفي انتظار الدفع"
                      : "your order has been accepted"}{" "}
                  </p>
                </div>
                <div>
                  <p className="text-center mb-0">{lang === 'ar' ? "رقم طلب الخدمة":"order number"}</p>
                  <p className="text-center mb-0" style={{color : "#3E4F94"}}>ID{servideData[0].Order_id}</p>
                </div>
              </div>
              <div className="mt-5">
                <div className="bg-white  py-3 px-4 m-auto d-flex justify-content-between align-items-center" style={{borderRadius : "10px"}}>
                  <p className="mb-0" >{lang === 'ar' ? "المبلغ الكلي " : "Total Price "}</p>
                  <p  className="mb-0" style={{fontSize : "1.3rem" , fontWeight : "bolder" , color : "#3E4F94"}}>{parseInt(servideData[0].Order_price)}{lang ==='ar'?" رس ":" rs"}</p>
                </div>
              </div>
              <div>
              <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}

                      >
                        {(formik) => {
                          return (
                            <Form className="mt-2" >
                                <label style={{fontSize : "1rem"}} className='mt-5' htmlFor="address"> {lang ==='ar' ? "اختر عنوان التوصيل":"select delivery address"}   </label>
                                <FormikControl 
                                control="select"
                                name="address"
                                options={address}
                                first = 'select address'
                                type = "servicesStatus"
                                onChange ={onChange}                
                                />
                                
                              <input type="submit" className={` ${!formik.isValid ? `${styles.disabled}` : ""}`} disabled={!formik.isValid} value={lang === 'ar' ? "الدفع الآن":"payment"} style={{marginTop : "50px"}} />

                            </Form>
                          );
                        }}
                      </Formik>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    );
  } else if (parseInt(status_id) >= 4) {
    return <section style={{background : "#F0F0F0" , paddingBottom : "100px"}} className={`${styles.statusSectionFinal} pt-5`} >
      <Container>
        <div className="d-flex">
          <p className="ms-4">{lang === 'ar' ? 'طلب رقم :' : 'order number :'}</p>
          <p style={{color : "#1E96FC"}}>ID{order_id}</p>
        </div>
        <div>
          <p className="mt-5 mb-2 text-secondary">{lang === 'ar' ? "خطوات التوصيل":"Delivery steps"}</p>
          {
           filteredStatus.map((item , index)=>(
            <div key={index} className={styles.parent}>
            <div className={styles.circle}>
              <div className={styles.square}>{index + 1}</div>
            </div>
            <div>
              <p className="mb-0" style={{color : "#212121"}}>
                {lang ==='ar' ? item.name_ar: item.name_en}
              </p>
            </div>
          </div>
           ))
          }
         
         
        </div>
      </Container>
    </section>
  }
};

export default ServicesStatus;

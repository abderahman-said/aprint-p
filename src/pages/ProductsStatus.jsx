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

const ProductsStatus = ({ lang }) => {
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
      <Helmet title={lang === "ar" ? "تفاصيل شراء المنتج" : "product status"}>
        <div className="mt-5">
          <Loader />
        </div>
      </Helmet>
    );
  }

   if (parseInt(status_id) >= 4) {
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

export default ProductsStatus;

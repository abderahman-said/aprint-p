import React , {useEffect , useState} from 'react'
import { useNavigate } from 'react-router-dom';
import  axios  from 'axios';
import ModalMe from "../components/ModalMe";

const Logout = ({lang,setIsUser}) => {
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
    useEffect(()=>{
        // axios.get('https://dashboard.mobtkra-press.com/api/logout')
        setIsUser(false)
        localStorage.removeItem("ut");
        setSuccessMessage(lang === "ar" ? "تم تسجيل الخروج بنجاح" :"logout done")
        setModalShow(true)
        setTimeout(() => {
          navigate('/')
        }, 1500);
    },[])
  return (
    <ModalMe
    show={modalShow}
    lang={lang}
    onHide={() => setModalShow(false)}
    body={successMessage}
  />
  )
}

export default Logout
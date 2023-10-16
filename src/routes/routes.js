import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Services from "../pages/Services";
import Service from "../pages/Service";
import ServiceFinal from "../pages/ServiceFinal";
import Products from "../pages/Products";
import SubProducts from "./../pages/SubProducts";
import Product from "../pages/Product";
import Cart from "../pages/Cart";
import Address from "../pages/Address";
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import ResetPass from "../pages/ResetPass";
import EnterCode from "../pages/EnterCode";
import EnterEmail from "../pages/EnterEmail";
import BuyService from "../pages/BuyService";
import NowOrders from "../pages/NowOrders";
import ServicesStatus from "../pages/ServicesStatus";
import CurrentProducts from "../pages/CurrentProducts";
import ProductsStatus from "../pages/ProductsStatus";
import FinishedProducts from "../pages/FinishedProducts";
import FinishedServices from "../pages/FinishedServices";
import SignUp from "../pages/SignUp";
import SignupEnter from "../pages/SignupEnter";
import Profile from "../pages/Profile";
import Control from "../pages/Control/Control";
// import Favourite from "../pages/Favourite";
import PastProducts from "../pages/PastProducts";
import PastServices from "../pages/PastServices";
import WaitingForPayment from "../pages/WaitingForPayment";
import WaitingForApprove from "../pages/WaitingForApprove";
import Processing from "../pages/Processing";
import Payment from "../pages/Payment";
import TrackOrder from "../pages/TrackOrder";
import TestProduct from "../pages/TestProduct";
import Contact from "../pages/Contact";

const Routers = ({ user, lang, isUser, setIsUser }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />}></Route>
      <Route path="/home" element={<Home lang={lang} />}></Route>
      <Route path="/testproduct" element={<TestProduct lang={lang} />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      {/* Contact */}
      <Route path="/Services">
        <Route index element={<Services lang={lang} />}></Route>
        <Route path=":id" element={<Service lang={lang} />}></Route>
        <Route path=":id/:id2" element={<ServiceFinal lang={lang} />}></Route>
        <Route
          path=":id/:id2/:id3"
          element={<BuyService isUser={isUser} lang={lang} />}
        ></Route>
      </Route>

      <Route path="/products">
        <Route index element={<Products lang={lang} />}></Route>
        <Route path=":id" element={<SubProducts lang={lang} />}></Route>
        <Route
          path=":id/:id2"
          element={<TestProduct isUser={isUser} lang={lang} />}
        ></Route>
      </Route>

      <Route path="/cart" element={<Cart lang={lang} />}></Route>
      <Route
        path="/login"
        element={<Login lang={lang} setIsUser={setIsUser} />}
      ></Route>
      <Route
        path="/logout"
        element={<Logout lang={lang} setIsUser={setIsUser} />}
      ></Route>

      <Route path="/forgetPass">
        <Route index element={<EnterEmail lang={lang} />}></Route>
        <Route path="enterCode" element={<EnterCode lang={lang} />}></Route>
        <Route
          path="enterCode/ResetPass"
          element={<ResetPass lang={lang} />}
        ></Route>
      </Route>
      <Route path="/signUp">
        <Route index element={<SignUp lang={lang} />}></Route>
        <Route path="enterCode" element={<SignupEnter lang={lang} />}></Route>
      </Route>

      <Route element={<Control />}>
        <Route path="/pastProducts" element={<PastProducts />} />
        <Route path="/pastServices" element={<PastServices />} />
        <Route path="/waitingForPayment/:id" element={<WaitingForPayment />} />
        <Route path="/waitingForApprove" element={<WaitingForApprove />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/trackOrder/:id/:id2" element={<TrackOrder />} />
        <Route
          path="/processing/:id"
          element={<Processing isUser={isUser} />}
        />
        <Route
          path="/profile"
          element={<Profile lang={lang} user={user} />}
        ></Route>
        <Route
          path="/address"
          element={<Address user={user} lang={lang} />}
        ></Route>
        {/* favorite */}
        {/* <Route path="/favorite" element={<Favourite lang={lang} />}></Route> */}
        <Route path="/currentOrders">
          <Route index element={<NowOrders lang={lang} />}></Route>
          <Route path="status" element={<ServicesStatus lang={lang} />}></Route>
        </Route>
        <Route path="/currentProducts">
          <Route index element={<CurrentProducts lang={lang} />}></Route>
          <Route
            path="proStatus"
            element={<ProductsStatus lang={lang} />}
          ></Route>
        </Route>
        <Route
          path="/finishedPRoducts"
          element={<FinishedProducts lang={lang} />}
        ></Route>
        <Route
          path="/finishedServices"
          element={<FinishedServices lang={lang} />}
        ></Route>
      </Route>
    </Routes>
  );
};

export default Routers;

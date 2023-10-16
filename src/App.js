import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Routers from "./routes/routes";
import Footer from "./components/Footer";

import axios from "axios";
import { useQueryHook } from "./components/custom_hooks/UseQueryHook";
// import bkImage from "./assets/images/contact/Group35411.png";
const App = () => {
  const [lang, setLang] = useState("en");
  const [user, setUser] = useState({
    image:
      "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg",
  });

  let intialUserState;
  if (localStorage.getItem("ut")) {
    intialUserState = true;
  } else {
    intialUserState = false;
  }
  const [isUser, setIsUser] = useState(intialUserState);
  const suc = (data) => {
    setUser(data.data.data);
  };
  const err = (err) => {
    // console.log(err);
  };
  const userFetcher = () => {
    return axios.get(
      `${process.env.REACT_APP_BACKEND_API}/users/${localStorage.getItem(
        "ui_Ap"
      )}`,
      {
        headers: {
          Authorization: localStorage.getItem("ut"),
        },
      }
    );
  };
  const { isLoading, error, isFetching, refetch } = useQueryHook(
    "get user",
    suc,
    err,
    userFetcher,
    false
  );

  useEffect(() => {
    if (isUser) {
      refetch();
    }
  }, [lang, refetch, isUser]);

  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = localStorage.getItem("ut");
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);
  return (
    <div
      dir={"ltr"}
      // style={{
      //   backgroundImage: bkImage,
      // }}
    >
      <Navbar user={user} lang={lang} isUser={isUser} setLang={setLang} />
      <Routers user={user} lang={lang} isUser={isUser} setIsUser={setIsUser} />
      <Footer lang={lang} setLang={setLang} />
    </div>
  );
};

export default App;

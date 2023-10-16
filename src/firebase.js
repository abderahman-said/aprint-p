// Import the functions you need from the SDKs you need
import axios from "axios";
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBwqTaJaQ-IXKT0HI01f2-cU0eXv1uPxDw",
  authDomain: "aprint-ebc79.firebaseapp.com",
  projectId: "aprint-ebc79",
  storageBucket: "aprint-ebc79.appspot.com",
  messagingSenderId: "980045436043",
  appId: "1:980045436043:web:e8bb3b2f6736f6be83b08e",
  measurementId: "G-KE19VR20RC",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const signINWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_API}/google/login`,
          {
            provider: 1,
            token: res._tokenResponse.oauthAccessToken,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          localStorage.setItem("ut", `Bearer ${res.data.data.token}`);
          localStorage.setItem("ui_Ap", `${res.data.data.id}`);
          setTimeout(() => {
            window.location.href = window.location.origin;
          }, 500);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

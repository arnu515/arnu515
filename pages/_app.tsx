import React from "react";
import { ToastContainer } from "react-toastify";
import "./app.css";
import "./form.css";
import "react-toastify/dist/ReactToastify.min.css";

export default function Application({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <ToastContainer />
    </>
  );
}

import React from "react";
import { ToastContainer } from "react-toastify";
import "./app.css";
import "./form.css";
import "react-toastify/dist/ReactToastify.min.css";
import Sidenav from "../lib/components/Sidenav";

export default function Application({ Component, pageProps }) {
  return (
    <>
      <div>
        <Sidenav />
        <div className="ml-16">
          <Component {...pageProps} />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

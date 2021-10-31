import React from "react";
import "./app.css";

export default function Application({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

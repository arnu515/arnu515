import { GeistProvider, CssBaseline } from "@geist-ui/react";
import "./app.css";

export default function Application({ Component, pageProps }) {
  return (
    <>
      <GeistProvider>
        <CssBaseline />
        <Component {...pageProps} />
      </GeistProvider>
    </>
  );
}

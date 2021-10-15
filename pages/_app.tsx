import React from "react";
import { GeistProvider, CssBaseline, GeistProviderProps } from "@geist-ui/react";
import "./app.css";
import useTheme, { ThemeProvider } from "../utils/hooks/useTheme";

function Geist(props: React.PropsWithChildren<GeistProviderProps>) {
  const { theme } = useTheme();

  return (
    <GeistProvider {...props} themeType={theme}>
      {props.children}
    </GeistProvider>
  );
}

export default function Application({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Geist>
        <CssBaseline />
        <Component {...pageProps} />
      </Geist>
    </ThemeProvider>
  );
}

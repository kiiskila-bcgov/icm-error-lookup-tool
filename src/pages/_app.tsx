import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@bcgov/bc-sans/css/BC_Sans.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

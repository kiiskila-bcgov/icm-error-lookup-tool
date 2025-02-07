import "../styles/globals.css";
import type { AppProps } from "next/app";
import "@bcgov/bc-sans/css/BC_Sans.css";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />;
    </SessionProvider>
  );
}

export default MyApp;

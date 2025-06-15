import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import HeaderUser from "@/Components/HeaderUser";

import "@/styles/globals.css";


export default function App({ Component, pageProps, }: AppProps) {
  return (

    <>
      <SessionProvider session={pageProps.session}>
        <HeaderUser />
        <Component {...pageProps} />
      </SessionProvider>
    </>
  );
}

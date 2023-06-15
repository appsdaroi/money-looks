import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

import Layout from "./layout";

import { MoneyContextProvider } from "@/services/moneyContext";

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      {pageProps.session ? (
        <MoneyContextProvider
          initialValue={pageProps.session.session.user.balance}
        >
          <Layout>
            <Component/>
          </Layout>
        </MoneyContextProvider>
      ) : (
        <Layout>
          <Component />
        </Layout>
      )}
    </SessionProvider>
  );
}

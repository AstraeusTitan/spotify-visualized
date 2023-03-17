import { SpotifyProvider } from "@/contexts/spotify";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import * as ReactDOMServer from "react-dom/server";
import Logo from "@/components/Logo";
import Layout from "@/components/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Spotify Visualized</title>
        <meta
          name="description"
          content="Visualize your Spotify listening data"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="icon"
          href={`data:image/svg+xml,${encodeURIComponent(
            ReactDOMServer.renderToStaticMarkup(
              <Logo strokeStyle={{ stroke: "#38bdf8" }} />
            )
          )}`}
        />
      </Head>
      <SpotifyProvider>
        {pageProps.noHeader ? (
          <Component {...pageProps} />
        ) : (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </SpotifyProvider>
    </>
  );
}

import * as Spotify from "@/components/Spotify";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Spotify.ContextProvider>
      <Component {...pageProps} />
    </Spotify.ContextProvider>
  );
}

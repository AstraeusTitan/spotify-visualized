import { useSpotify } from "@/hooks/useSpotify";
import {
  getState,
  purgeTokenLocalStore,
  setLocalStore,
  TResponseData,
} from "@/utilities/spotify";
import { useEffect } from "react";

export async function getStaticProps() {
  return {
    props: {
      successURL: "/details",
      errorURL: "/",
    },
  };
}

const Callback = ({
  successURL,
  errorURL,
}: {
  successURL: string;
  errorURL: string;
}) => {
  const spotify = useSpotify();
  useEffect(() => {
    const target = window.opener || window;
    if (spotify.handleCallback) {
      spotify.handleCallback({
        fragment: window.location.hash.substring(1),
        query: window.location.search.substring(1),
        state: getState() || "",
        successFn: (response: TResponseData) => {
          setLocalStore(response);
          target.next.router.push(successURL);
          window.close();
        },
        errorFn: (response: TResponseData) => {
          purgeTokenLocalStore({});
          target.next.router.push(errorURL);
          window.close();
        },
      });
    }
  }, [spotify, successURL, errorURL]);

  // TODO: Add a loading message
  return <div>Callback page</div>;
};
export default Callback;

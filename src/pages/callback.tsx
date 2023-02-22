import { useSpotify } from "@/hooks/useSpotify";
import { getState, TResponseData } from "@/utilities/spotify";
import { useLayoutEffect } from "react";

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
  useLayoutEffect(() => {
    const target = window.opener || window;
    if (spotify.handleCallback) {
      spotify.handleCallback({
        fragment: window.location.hash.substring(1),
        query: window.location.search.substring(1),
        state: getState() || "",
        successFn: (response: TResponseData) => {
          console.log(response);
          target.next.router.push(successURL);
          window.close();
        },
        errorFn: (response: TResponseData) => {
          console.error(response);
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

import SpotifyAPI, { SpotifyAPITypes } from "@/utilities/spotifyApi";
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
  useEffect(() => {
    const target = (window.opener || window) as SpotifyAPITypes.AuthWindow;
    if (target.SpotifyAPI) {
      (target.SpotifyAPI as typeof SpotifyAPI).handleCallback(
        window.location.hash.substring(1),
        window.location.search.substring(1),
        (response) => {
          target.next && target.next.router.push(successURL);
          window.close();
        },
        (response) => {
          target.next && target.next.router.push(errorURL);
          window.close();
        }
      );
    }
  }, [successURL, errorURL]);

  // TODO: Add a loading message
  return <div>Callback page</div>;
};
export default Callback;

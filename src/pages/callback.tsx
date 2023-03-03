import Auth from "@/utilities/Spotify/Auth";
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
    const target = window.opener || window;
    const spotifyAuth = target.SpotifyAuth as Auth;
    if (spotifyAuth) {
      spotifyAuth.handleCallback(
        window.location.hash.substring(1),
        window.location.search.substring(1),
        (err, data) => {
          if (err) {
            target.next && target.next.router.push(errorURL);
            window.close();
          } else {
            target.next && target.next.router.push(successURL);
            window.close();
          }
        }
      );
    }
  }, [successURL, errorURL]);

  // TODO: Add a loading message
  return <div>Callback page</div>;
};
export default Callback;

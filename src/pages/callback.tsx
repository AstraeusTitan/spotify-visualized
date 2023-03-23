import Auth from "@/utilities/Spotify/Auth";
import { useEffect } from "react";

export async function getStaticProps() {
  return {
    props: {
      noHeader: true,
    },
  };
}

const Callback = () => {
  useEffect(() => {
    const target = window.opener;
    if (!target) {
      (window as any).next.router.push("/");
      return;
    }
    const spotifyAuth = target.SpotifyAuth as Auth;
    spotifyAuth?.handleCallback(
      window.location.hash.substring(1),
      window.location.search.substring(1),
      (err, data) => {
        if (err) {
          target.next && target.next.router.push("/");
          window.close();
        } else {
          target.next && target.next.router.push("/me");
          window.close();
        }
      }
    );
  }, []);

  // TODO: Add a loading message
  return <div>Callback page</div>;
};
export default Callback;

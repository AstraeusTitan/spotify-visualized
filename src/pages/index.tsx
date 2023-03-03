import { Container } from "@/components/Container";
import { LoginButton } from "@/components/Login";
import { useSpotify } from "@/hooks/useSpotify";
import Spotify, { SpotifyConfig } from "@/utilities/Spotify";
import { useEffect } from "react";

export async function getStaticProps() {
  return {
    props: {
      spotifyConfig: {
        clientId: process.env.CLIENT_ID,
        redirectUri: process.env.REDIRECT_URI,
        scopes: process.env.SPOTIFY_SCOPES?.split(" "),
      } as SpotifyConfig,
    },
  };
}

export default function Home({
  spotifyConfig,
}: {
  spotifyConfig: SpotifyConfig;
}) {
  const { spotify, setSpotify } = useSpotify();
  useEffect(() => {
    if (setSpotify) {
      let s = new Spotify({
        ...spotifyConfig,
        fetch: fetch.bind(window),
        storage: window.localStorage,
      });
      setSpotify(s);
    }
  }, [setSpotify, spotifyConfig]);
  useEffect(() => {
    if (spotify) {
      console.log("attempt to load");
      spotify?.Auth.loadToken(window.localStorage);
      console.log(spotify?.config);
    }
  }, [spotify]);
  return (
    <Container>
      <div className="grid place-content-center h-screen">
        <div className="w-fit text-center">
          <h1 className="text-4xl font-bold">Chart Your Data</h1>
          <p className="max-w-sm mt-4">
            Login with your spotify account to see your Spotify listening data
            in a whole new way.
          </p>
          <div className="flex justify-center mt-8">
            <LoginButton>Login to Spotify</LoginButton>
          </div>
        </div>
      </div>
    </Container>
  );
}

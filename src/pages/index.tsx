import * as Spotify from "@/components/Spotify";
import { useSpotify } from "@/hooks/useSpotify";
import { useEffect } from "react";

export async function getStaticProps() {
  return {
    props: {
      spotifyConfig: {
        clientID: process.env.CLIENT_ID,
        redirectURI: process.env.REDIRECT_URI,
        scopes: process.env.SPOTIFY_SCOPES,
      },
    },
  };
}

export default function Home({
  spotifyConfig,
}: {
  spotifyConfig: {
    clientID: string;
    redirectURI: string;
    scopes: string;
  };
}) {
  const spotify = useSpotify();
  useEffect(() => {
    spotify.setSpotifyConfig && spotify.setSpotifyConfig(spotifyConfig);
  }, [spotify, spotifyConfig]);
  return (
    <>
      <div>Index page</div>
      <Spotify.LoginButton>
        Login to Spotify
      </Spotify.LoginButton>
    </>
  );
}

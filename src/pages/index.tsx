import { Container } from "@/components/Container";
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
    <Container>
      <div className="grid place-content-center h-screen">
        <div className="w-fit text-center">
          <h1 className="text-4xl font-bold">Chart Your Data</h1>
          <p className="max-w-sm mt-4">
            Login with your spotify account to see your Spotify listening data
            in a whole new way.
          </p>
          <div className="flex justify-center mt-8">
            <Spotify.LoginButton>Login to Spotify</Spotify.LoginButton>
          </div>
        </div>
      </div>
    </Container>
  );
}

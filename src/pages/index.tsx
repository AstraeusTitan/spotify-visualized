import { Container } from "@/components/Container";
import { LoginButton } from "@/components/Login";
import SpotifyAPI from "@/utilities/spotifyApi";
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
  useEffect(() => {
    SpotifyAPI.setConfig(spotifyConfig);
  }, [spotifyConfig]);
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

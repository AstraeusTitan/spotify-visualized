import { Container } from "@/components/Container";
import { LoginButton } from "@/components/Login";
import { useSpotify } from "@/hooks/useSpotify";
import { SpotifyConfig } from "@/utilities/Spotify";
import { useEffect } from "react";

export async function getStaticProps() {
  return {
    props: {
      noHeader: true,
      spotifyConfig: {
        clientId: process.env.CLIENT_ID,
        redirectUri: `${process.env.NEXT_PUBLIC_URL}/callback`,
        scopes: [
          "user-top-read",
          "user-read-recently-played",
          "playlist-read-private",
          "playlist-read-collaborative",
          "user-library-read",
        ],
      },
    },
  };
}

export default function Home({
  spotifyConfig,
}: {
  spotifyConfig: SpotifyConfig;
}) {
  const { spotify } = useSpotify(spotifyConfig);
  useEffect(() => {
    if (spotify) {
      spotify.config.clientId = spotifyConfig.clientId;
      spotify.config.redirectUri = spotifyConfig.redirectUri;
      spotify.config.scopes = spotifyConfig.scopes;
    }
  }, [
    spotify,
    spotifyConfig.clientId,
    spotifyConfig.redirectUri,
    spotifyConfig.scopes,
  ]);
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

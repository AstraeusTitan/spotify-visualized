import { SpotifyContext } from "@/contexts/spotify";
import Spotify, { SpotifyConfig } from "@/utilities/Spotify";
import { useContext, useEffect } from "react";

type Props = {
  clientId?: string;
  redirectUri?: string;
};
export const useSpotify = ({ clientId, redirectUri }: Props = {}) => {
  const { spotify, setSpotify } = useContext(SpotifyContext);
  useEffect(() => {
    console.info("Inside useSpotify");
    if (spotify === undefined && setSpotify) {
      console.info("spotify undefined");
      const config: SpotifyConfig = {
        clientId,
        redirectUri,
        storage: window.localStorage,
        fetch: fetch.bind(window),
      };
      const s = new Spotify(config);
      s?.Auth.loadToken(window.localStorage);
      setSpotify(s);
    }
    console.info("spotify", spotify);
  }, [clientId, redirectUri, setSpotify, spotify]);
  return { spotify, setSpotify };
};

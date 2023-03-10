import { SpotifyContext } from "@/contexts/spotify";
import Spotify, { SpotifyConfig } from "@/utilities/Spotify";
import { useContext, useEffect } from "react";

export const useSpotify = (config: SpotifyConfig = {}) => {
  const { spotify, setSpotify } = useContext(SpotifyContext);
  useEffect(() => {
    if (spotify === undefined && setSpotify) {
      const s = new Spotify({
        ...config,
        storage: window.localStorage,
        fetch: fetch.bind(window),
      });
      s?.Auth.loadToken(window.localStorage);
      setSpotify(s);
    }
  }, [config, setSpotify, spotify]);
  return { spotify, setSpotify };
};

import { SpotifyContext } from "@/contexts/spotify";
import { useContext } from "react";

export const useSpotify = () => {
  return useContext(SpotifyContext);
};

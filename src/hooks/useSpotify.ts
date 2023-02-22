import { ISpotifyContext, SpotifyAuthContext } from "@/contexts/spotifyAuth";
import { useContext } from "react";

export const useSpotifyAuth = (): ISpotifyContext =>
  useContext(SpotifyAuthContext);

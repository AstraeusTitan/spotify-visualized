import { SpotifyAuthContext } from "@/contexts/spotifyAuth";
import { useContext } from "react";

export const useSpotifyAuth = () => useContext(SpotifyAuthContext);
export {};

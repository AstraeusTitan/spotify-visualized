import { SpotifyContext } from "@/contexts/spotify";
import { useContext } from "react";

export const useSpotifyAuth = () => useContext(SpotifyContext);

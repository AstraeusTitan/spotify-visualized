import Spotify from "@/utilities/Spotify";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  useState,
} from "react";

export const SpotifyContext = createContext<{
  spotify: Spotify | undefined;
  setSpotify: Dispatch<SetStateAction<Spotify | undefined>> | undefined;
}>({ spotify: undefined, setSpotify: undefined });

export const SpotifyProvider = ({ children }: PropsWithChildren) => {
  const [spotify, setSpotify] = useState<Spotify>();
  return (
    <SpotifyContext.Provider value={{ spotify, setSpotify }}>
      {children}
    </SpotifyContext.Provider>
  );
};

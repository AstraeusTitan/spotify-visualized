import { SpotifyContext } from "@/contexts/spotify";
import {
  openLoginPopup,
  purgeTokenLocalStore,
  handleCallback,
  setState,
} from "@/utilities/spotify";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [spotifyConfig, setSpotifyConfig] = useState({
    clientID: "",
    redirectURI: "",
    scopes: "",
  });

  const logout = (redirectURI: string = "/") => {
    purgeTokenLocalStore({});
    router.push(redirectURI);
  };

  const cxValue = {
    openLoginPopup: () => {
      const [popup, state] = openLoginPopup({
        redirectURI: spotifyConfig.redirectURI,
        clientID: spotifyConfig.clientID,
        scopes: spotifyConfig.scopes,
      });
      setState(state);
    },
    logout,
    setSpotifyConfig,
    handleCallback,
  };
  return (
    <SpotifyContext.Provider value={cxValue}>
      {children}
    </SpotifyContext.Provider>
  );
};

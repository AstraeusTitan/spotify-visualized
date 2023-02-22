import { SpotifyAuthContext } from "@/contexts/spotifyAuth";
import {
  openLoginPopup,
  purgeTokenLocalStore,
  ISpotifyProps,
  handleCallback,
} from "@/utilities/spotify";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";

export const ContextProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const [spotifyConfig, setSpotifyConfig] = useState<ISpotifyProps>({
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
      openLoginPopup({
        redirectURI: spotifyConfig.redirectURI,
        clientID: spotifyConfig.clientID,
        scopes: spotifyConfig.scopes,
      });
    },
    logout,
    setSpotifyConfig,
    handleCallback,
  };
  return (
    <SpotifyAuthContext.Provider value={cxValue}>
      {children}
    </SpotifyAuthContext.Provider>
  );
};

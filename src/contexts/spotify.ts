import { THandleCallbackParams } from "@/utilities/spotify";
import { createContext, Dispatch, SetStateAction } from "react";

type TSpotifyContext = {
  openLoginPopup?: () => void;
  logout?: (redirectURL: string) => void;
  setSpotifyConfig?: Dispatch<
    SetStateAction<{
      clientID: string;
      redirectURI: string;
      scopes: string;
    }>
  >;
  handleCallback?: ({
    fragment,
    query,
    state,
    successFn,
    errorFn,
  }: THandleCallbackParams) => any;
};

export const SpotifyContext = createContext<TSpotifyContext>({});

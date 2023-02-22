import { Context, createContext } from "react";

// TODO: set better types
export interface ISpotifyContext {
  openLoginPopup?: any;
  logout?: any;
  setSpotifyConfig?: any;
  handleCallback?: any;
}

export const SpotifyAuthContext: Context<ISpotifyContext> =
  createContext<ISpotifyContext>({});

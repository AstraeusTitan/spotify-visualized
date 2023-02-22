export { authURL, openLoginPopup, handleCallback } from "./auth";
export type {
  TResponseData,
  TOpenLoginParams,
  THandleCallbackParams,
} from "./auth";

export {
  setLocalStore,
  purgeTokenLocalStore,
  setState,
  getState,
  tokenValid,
} from "./storage";

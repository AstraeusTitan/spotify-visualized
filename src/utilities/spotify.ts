const BASE_API_URL = "https://api.spotify.com/v1";
export interface ISpotifyProps {
  clientID: string;
  redirectURI: string;
  scopes: string;
  storageKeys?: IStorageKeys;
}

export interface IStorageKeys {
  accessToken: string;
  expTimestamp: string;
  tokenType: string;
}
const STORAGE_KEYS: IStorageKeys = {
  accessToken: "SPOTIFY_ACCESS_TOKEN",
  expTimestamp: "SPOTIFY_TOKEN_EXP_TIMESTAMP",
  tokenType: "SPOTIFY_TOKEN_TYPE",
};

const validationString = (
  length: number = 12,
  randomFn: () => number = Math.random
): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(randomFn() * possible.length));
  }

  return text;
};

interface IAuthURLProps {
  clientID: string;
  redirectURI: string;
  scopes: string;
  checkString?: string;
}
const authURL = ({
  redirectURI,
  scopes,
  clientID,
  checkString = validationString(),
}: IAuthURLProps): { url: string; state: string } => {
  return {
    url: `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(
      clientID
    )}&redirect_uri=${encodeURIComponent(
      redirectURI
    )}&scope=${encodeURIComponent(
      scopes
    )}&response_type=token&state=${encodeURIComponent(
      checkString
    )}&show_dialog=true`,
    state: checkString,
  };
};

interface IAuthResponse {
  fragment?: string;
  query?: string;
}

interface IResponseData {
  accessToken: string | undefined;
  expiresIn: number | undefined;
  tokenType: string | undefined;
  error: string | undefined;
  state: string | undefined;
}
export const parseAuthResponse = ({
  fragment,
  query,
}: IAuthResponse): IResponseData => {
  let returnData: IResponseData = {
    accessToken: undefined,
    expiresIn: undefined,
    tokenType: undefined,
    error: undefined,
    state: undefined,
  };

  if (fragment) {
    const fragmentSearch = new URLSearchParams(fragment);
    returnData = {
      ...returnData,
      accessToken: fragmentSearch.get("access_token") || undefined,
      expiresIn:
        parseInt(fragmentSearch.get("expires_in") || "", 10) || undefined,
      tokenType: fragmentSearch.get("token_type") || undefined,
      state: fragmentSearch.get("state") || undefined,
    };
  }

  if (query) {
    const querySearch = new URLSearchParams(query);
    returnData = {
      ...returnData,
      error: querySearch.get("error") || undefined,
      state: querySearch.get("state") || undefined,
    };
  }

  return returnData;
};

// TODO: Setup better types
export interface IWindow {
  open: (url: string, target: string, features: string) => object | null;
  checkState?: string;
  next?: any;
}
interface ILoginPopupProps extends IAuthURLProps {
  windowObj?: IWindow;
}
export const openLoginPopup = ({
  windowObj = window,
  redirectURI,
  scopes,
  clientID,
  checkString = validationString(),
}: ILoginPopupProps): { window: object | null; checkString: string } => {
  const { url, state } = authURL({
    redirectURI: redirectURI,
    scopes: scopes,
    clientID: clientID,
    checkString: checkString,
  });
  windowObj.checkState = state;
  const popupWindow = windowObj.open(
    url,
    "Login with Spotify",
    "width=600, height=800"
  );

  return {
    window: popupWindow,
    checkString: checkString,
  };
};

interface IStorageProps {
  accessToken: string | undefined;
  expiresIn: number | undefined;
  tokenType: string | undefined;
  storageKeys?: IStorageKeys;
  storeFn?: (key: string, value: string) => void;
}

export const setTokenLocalStore = ({
  accessToken,
  expiresIn,
  tokenType,
  storageKeys = STORAGE_KEYS,
  storeFn = window.localStorage.setItem,
}: IStorageProps): boolean => {
  try {
    if (accessToken) {
      storeFn(storageKeys.accessToken, accessToken);
    }
    if (expiresIn) {
      const timestamp = Math.floor(Date.now() / 1000 + expiresIn);
      storeFn(storageKeys.expTimestamp, timestamp.toString());
    }
    if (tokenType) {
      storeFn(storageKeys.tokenType, tokenType);
    }
    return true;
  } catch (error) {
    console.error("Failed to store token to LocalStorage");
    return false;
  }
};

type TTokenStore = ({
  storageKeys,
  removeFn,
}: {
  storageKeys?: IStorageKeys;
  removeFn?: (key: string) => void;
}) => boolean;
export const purgeTokenLocalStore: TTokenStore = ({
  storageKeys = STORAGE_KEYS,
  removeFn = window.localStorage.removeItem,
}): boolean => {
  try {
    Object.values(storageKeys).forEach((key) => {
      removeFn(key);
    });
    return true;
  } catch (error) {
    console.error("Failed to purge token from LocalStorage");
    return false;
  }
};

export {};

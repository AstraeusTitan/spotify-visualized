const BASE_API_URL = "https://api.spotify.com/v1";

interface IStorageKeys {
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
  scopes: string[];
  checkString?: string;
}
const authURL = ({
  redirectURI,
  scopes,
  clientID,
  checkString = validationString(),
}: IAuthURLProps) => {
  return `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(
    clientID
  )}&redirect_uri=${encodeURIComponent(redirectURI)}&scope=${encodeURIComponent(
    scopes.join(" ")
  )}&response_type=token&state=${encodeURIComponent(
    checkString
  )}&show_dialog=true`;
};

interface IAuthResponse {
  fragment?: string;
  query?: string;
}

interface IResponseData {
  accessToken?: string;
  expiresIn?: number;
  tokenType?: string;
  error?: string;
  state?: string;
}
const parseAuthResponse = ({
  fragment,
  query,
}: IAuthResponse): IResponseData => {
  let fragmentData: IResponseData = { state: "" };
  let queryData: IResponseData = { state: "" };

  if (fragment) {
    const fragmentSearch = new URLSearchParams(fragment);
    fragmentData = {
      accessToken: fragmentSearch.get("access_token") || undefined,
      expiresIn:
        parseInt(fragmentSearch.get("expires_in") || "", 10) || undefined,
      tokenType: fragmentSearch.get("token_type") || undefined,
      state: fragmentSearch.get("state") || undefined,
    };
  }

  if (query) {
    const querySearch = new URLSearchParams(query);
    queryData = {
      error: querySearch.get("error") || undefined,
      state: querySearch.get("state") || undefined,
    };
  }

  return { ...fragmentData, ...queryData };
};

interface IStorageProps {
  accessToken: string;
  expiresIn: number;
  tokenType: string;
  storageKeys?: IStorageKeys;
  storeFn: (key: string, value: string) => void;
}

const setTokenLocalStore = ({
  accessToken,
  expiresIn,
  tokenType,
  storageKeys = STORAGE_KEYS,
  storeFn = window.localStorage.setItem,
}: IStorageProps): boolean => {
  try {
    const timestamp = Math.floor(Date.now() / 1000 + expiresIn);
    storeFn(storageKeys.accessToken, accessToken);
    storeFn(storageKeys.expTimestamp, timestamp.toString());
    storeFn(storageKeys.tokenType, tokenType);
    return true;
  } catch (error) {
    console.error("Failed to store token to LocalStorage");
    return false;
  }
};

type TTokenStore = (
  storageKeys: IStorageKeys,
  removeFn: (key: string) => void
) => boolean;
const purgeTokenLocalStore: TTokenStore = (
  storageKeys = STORAGE_KEYS,
  removeFn = window.localStorage.removeItem
): boolean => {
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

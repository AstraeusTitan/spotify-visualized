type TStorageKeys = {
  accessToken: string;
  expTimestamp: string;
  tokenType: string;
  state: string;
};

const STORAGE_KEYS: TStorageKeys = {
  accessToken: "SPOTIFY_ACCESS_TOKEN",
  expTimestamp: "SPOTIFY_TOKEN_EXP_TIMESTAMP",
  tokenType: "SPOTIFY_TOKEN_TYPE",
  state: "SPOTIFY_REQ_STATE",
};

type TStorageProps = {
  accessToken: string | undefined;
  expiresIn: number | undefined;
  tokenType: string | undefined;
  storageKeys?: TStorageKeys;
  storeFn?: (key: string, value: string) => void;
};

const setLocalStore = ({
  accessToken,
  expiresIn,
  tokenType,
  storageKeys = STORAGE_KEYS,
  storeFn = window.localStorage.setItem.bind(window.localStorage),
}: TStorageProps): boolean => {
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
  storageKeys?: TStorageKeys;
  removeFn?: (key: string) => void;
}) => boolean;

const purgeTokenLocalStore: TTokenStore = ({
  storageKeys = STORAGE_KEYS,
  removeFn = window.localStorage.removeItem.bind(window.localStorage),
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

const setState = (
  state: string,
  key: string = STORAGE_KEYS.state,
  storeFn: (
    key: string,
    value: string
  ) => void = window.localStorage.setItem.bind(window.localStorage)
): void => {
  try {
    return storeFn(key, state);
  } catch (error) {
    console.error(error);
  }
};

const getState = (
  key: string = STORAGE_KEYS.state,
  getFn: (key: string) => string | null = window.localStorage.getItem.bind(
    window.localStorage
  )
): string | null => {
  console.log(getFn);
  return getFn(key);
};

const tokenValid = (
  key = STORAGE_KEYS.expTimestamp,
  getFn = window.localStorage.getItem.bind(window.localStorage)
) => {
  const timestamp = parseInt(getFn(key) || "0");
  return Math.floor(Date.now() / 1000) < timestamp;
};

export { setLocalStore, purgeTokenLocalStore, setState, getState, tokenValid };

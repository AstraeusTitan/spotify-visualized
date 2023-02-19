const BASE_API_URL = "https://api.spotify.com/v1";

interface IStorageKeys {
  accessToken: string;
  exp_timestamp: string;
  token_type: string;
}
const STORAGE_KEYS: IStorageKeys = {
  accessToken: "SPOTIFY_ACCESS_TOKEN",
  exp_timestamp: "SPOTIFY_TOKEN_EXP_TIMESTAMP",
  token_type: "SPOTIFY_TOKEN_TYPE",
};
export {};

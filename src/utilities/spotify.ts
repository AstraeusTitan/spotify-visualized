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

const validationString = (length: number = 12): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
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
export {};

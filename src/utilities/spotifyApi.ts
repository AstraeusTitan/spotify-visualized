export namespace SpotifyAPITypes {
  export type AuthResponse = {
    accessToken?: string;
    tokenType?: string;
    expiresIn?: number;
    expTimestamp?: number;
    state?: string;
    error?: string;
  };

  export type AuthWindow = Window &
    typeof globalThis & {
      SpotifyAPI?: SpotifyAPI;
      next:
        | {
            router: {
              push: (url: string) => void;
            };
          }
        | undefined;
    };
}

class SpotifyAPI {
  static _clientID: string | undefined;
  static _redirectURI: string | undefined;
  static _state: string;
  static _scopes: string | undefined;
  static _token: string | undefined;
  static _expTimestamp: number | undefined;

  static setConfig = ({
    clientID,
    redirectURI,
    scopes,
  }: {
    clientID: string;
    redirectURI: string;
    scopes: string;
  }) => {
    SpotifyAPI._clientID = clientID;
    SpotifyAPI._redirectURI = redirectURI;
    SpotifyAPI._scopes = scopes;
  };

  static get tokenValid(): boolean {
    const current = Math.floor(Date.now() / 1000);
    return current < (SpotifyAPI._expTimestamp || 0);
  }

  static _generateState = (
    length: number = 12,
    random: () => number = Math.random
  ): string => {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(random() * possible.length));
    }
    return text;
  };

  static _urlBuilder = (
    clientID: string | undefined,
    redirectURI: string | undefined,
    scopes: string | undefined,
    state: string | undefined
  ): string => {
    return `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(
      clientID || ""
    )}&redirect_uri=${encodeURIComponent(
      redirectURI || ""
    )}&scope=${encodeURIComponent(
      scopes || ""
    )}&response_type=token&state=${encodeURIComponent(
      state || ""
    )}&show_dialog=true`;
  };

  static _parseAuthResponse = (
    fragment: string | undefined,
    query: string | undefined
  ): SpotifyAPITypes.AuthResponse => {
    let response = {};
    if (fragment) {
      const fragmentSearch = new URLSearchParams(fragment);
      const expiresIn =
        parseInt(fragmentSearch.get("expires_in") || "", 10) || undefined;
      const timestamp = expiresIn
        ? Math.floor(Date.now() / 1000 + expiresIn)
        : undefined;
      response = {
        ...response,
        accessToken: fragmentSearch.get("access_token") || undefined,
        expiresIn: expiresIn,
        expTimestamp: timestamp,
        tokenType: fragmentSearch.get("token_type") || undefined,
        state: fragmentSearch.get("state") || undefined,
      };
    }
    if (query) {
      const querySearch = new URLSearchParams(query);
      response = {
        ...response,
        error: querySearch.get("error") || undefined,
        state: querySearch.get("state") || undefined,
      };
    }
    return response;
  };

  static openLoginPopup = (
    target: SpotifyAPITypes.AuthWindow
  ): SpotifyAPITypes.AuthWindow | null => {
    SpotifyAPI._state = SpotifyAPI._generateState();
    const authURL = SpotifyAPI._urlBuilder(
      SpotifyAPI._clientID,
      SpotifyAPI._redirectURI,
      SpotifyAPI._scopes,
      SpotifyAPI._state
    );
    const popup = target.open(
      authURL,
      "Login with Spotify",
      "width=600, height=800"
    ) as SpotifyAPITypes.AuthWindow;
    target.SpotifyAPI = SpotifyAPI;
    console.info("Target class pass:", target.SpotifyAPI);
    return popup as SpotifyAPITypes.AuthWindow;
  };

  static handleCallback = (
    fragment: string,
    query: string,
    successFn: (response: object) => any = (data) => data,
    errorFn: (response: object) => any = (data) => data
  ) => {
    const response = SpotifyAPI._parseAuthResponse(fragment, query);
    if (response.state !== SpotifyAPI._state) {
      response.error = "State mismatch";
      SpotifyAPI._token = undefined;
      SpotifyAPI._expTimestamp = undefined;
      return errorFn(response);
    }
    if (response.error) {
      SpotifyAPI._token = undefined;
      SpotifyAPI._expTimestamp = undefined;
      return errorFn(response);
    }
    SpotifyAPI._token = response.accessToken;
    SpotifyAPI._expTimestamp = response.expTimestamp;
    return successFn(response);
  };
}
export default SpotifyAPI;

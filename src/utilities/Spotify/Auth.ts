export type AuthConfig = {
  clientId: string;
  scopes: string[];
  redirectUri: string;
  token?: AuthToken;
  storage: {
    getItem: (key: string) => string | null;
    setItem: (key: string, value: string) => void;
  };
};

export type AuthResponse = {
  expiresAt?: number | null;
  accessToken?: string | null;
  state?: string | null;
  error?: string | null;
};

export type AuthToken = {
  accessToken: string;
  expiresAt: number;
};

class Auth {
  config: AuthConfig;
  _storageKeys = {
    accessToken: "SPOTIFY_ACCESS_TOKEN",
    expiresAt: "SPOTIFY_TOKEN_EXPIRATION",
  };
  _checkState = "";

  constructor(config: AuthConfig) {
    this.config = config;
  }

  generateCheckState(
    length: number = 12,
    random: () => number = Math.random
  ): string {
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let text = "";
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(random() * possible.length));
    }
    this._checkState = text;
    return text;
  }

  url(state?: string): string {
    return `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(
      this.config.clientId
    )}&redirect_uri=${encodeURIComponent(
      this.config.redirectUri
    )}&scope=${encodeURIComponent(
      this.config.scopes.join(" ")
    )}&response_type=token&state=${encodeURIComponent(
      state || this.generateCheckState()
    )}&show_dialog=false`;
  }

  parseAuthResponse(
    fragment: string | null | undefined,
    query?: string | null | undefined
  ): AuthResponse {
    let response: AuthResponse = {};
    if (fragment) {
      const fragmentSearch = new URLSearchParams(fragment);
      let expiresIn = parseInt(fragmentSearch.get("expires_in") || "", 10);
      response = {
        expiresAt: Math.floor(Date.now() / 1000) + expiresIn,
        accessToken: fragmentSearch.get("access_token"),
        state: fragmentSearch.get("state"),
      };
    }
    if (query) {
      const querySearch = new URLSearchParams(query);
      response = {
        error: querySearch.get("error"),
        state: querySearch.get("state"),
      };
    }
    return response;
  }

  openLoginPopup(target: any): void {
    target.SpotifyAuth = this;
    target.open(this.url(), "Login with Spotify", "width=600, height=800");
  }

  handleCallback(
    fragment: string | null | undefined,
    query: string | null | undefined,
    callback?: (err?: string | null | undefined, data?: AuthToken) => void
  ) {
    const response = this.parseAuthResponse(fragment, query);
    if (response.state !== this._checkState) {
      response.error = "state_mismatch";
    }
    if (response.error) {
      this.clearToken();
      if (callback) {
        callback(response.error);
      }
      return;
    }
    let token = {
      accessToken: response.accessToken || "",
      expiresAt: response.expiresAt || 0,
    };
    this.setToken(token);
    if (callback) {
      callback(null, token);
    }
  }

  tokenValid(): boolean {
    const token = this.config.token;
    const now = Math.floor(Date.now() / 1000);
    return token !== undefined && token.expiresAt > now;
  }

  setToken(token: AuthToken) {
    this.config.token = token;
    this.storeToken();
  }

  clearToken() {
    this.config.token = undefined;
    this.storeToken();
  }

  storeToken(storage = this.config.storage) {
    if (this.config.token) {
      try {
        storage.setItem(
          this._storageKeys.accessToken,
          this.config.token?.accessToken
        );
        storage.setItem(
          this._storageKeys.expiresAt,
          this.config.token?.expiresAt.toString()
        );
      } catch (error) {
        console.error("Error saving to storage", error);
      }
    } else {
      try {
        storage.setItem(this._storageKeys.accessToken, "");
        storage.setItem(this._storageKeys.expiresAt, "0");
      } catch (error) {
        console.error("Error saving to storage", error);
      }
    }
  }

  loadToken(storage = this.config.storage): AuthToken {
    try {
      let token: AuthToken = {
        accessToken: storage.getItem(this._storageKeys.accessToken) || "",
        expiresAt:
          parseInt(storage.getItem(this._storageKeys.expiresAt) || "0") || 0,
      };
      this.config.token = token;
      return token;
    } catch (error) {
      console.error(error);
      return { accessToken: "", expiresAt: 0 };
    }
  }
}

export default Auth;

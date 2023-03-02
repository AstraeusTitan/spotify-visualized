import { AuthToken } from "./Auth";

export type ApiConfig = {
  token?: AuthToken;
  scopes: string[];
  fetch?: (input: string, init?: any) => Promise<any>;
};

export type QueryParams = {
  [key: string]: number | string | number[] | undefined;
  limit?: number;
  after?: number;
  before?: number;
  ids?: string | number[];
};

class Api {
  baseUrl = "https://api.spotify.com/v1";
  config: ApiConfig;

  constructor(config: ApiConfig) {
    this.config = config;
  }

  _buildQuery(params?: QueryParams): string {
    if (params === undefined) {
      return "";
    }
    const strings = Object.keys(params).map((key) => {
      return `${encodeURIComponent(key)}=${encodeURIComponent(
        params[key] as any
      )}`;
    });
    return `?${strings.join("&")}`;
  }

  _hasScope(scope: string): boolean {
    return this.config.scopes.includes(scope);
  }

  _makeRequest(
    route: string,
    requiredScope?: string | null | undefined,
    params?: QueryParams
  ) {
    if (this.config.fetch === undefined) {
      throw new Error("No fetch is defined");
    }

    if (requiredScope && !this._hasScope(requiredScope)) {
      throw new Error(`Token missing scope: ${requiredScope}`);
    }

    const headers = {
      Authorization: `Bearer ${this.config.token?.accessToken}`,
      "Content-Type": "application/json",
    };
    const query = this._buildQuery(params);
    const url = `${this.baseUrl}${route}${params ? query : ""}`;
    return this.config.fetch(url, { headers });
  }

  getRecentlyPlayed(params: QueryParams = { limit: 20 }) {
    return this._makeRequest(
      "/me/player/recently-played",
      "user-read-recently-played",
      params
    );
  }

  getTracksAudioFeatures(params: QueryParams) {
    return this._makeRequest("/audio-features", null, {
      ids: params.ids,
    });
  }
}

export default Api;

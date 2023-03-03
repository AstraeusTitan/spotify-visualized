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
    return this.config
      .fetch(url, { headers })
      .then((response) => response.json());
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

export type RecentlyPlayedTrack = {
  context?: Context;
  played_at: string;
  track: Track;
};

export type Context = {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
};

export type Track = {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: ExternalIds;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
};

export type Artist = {
  href: string;
  id: string;
  name: string;
  type: "artist";
  uri: string;
  external_urls: ExternalUrls;
};

export type Album = {
  type: "album";
  album_type: "single" | "album" | "compilation";
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  total_tracks: number;
  uri: string;
};

export type Image = {
  url: string;
  height: number;
  width: number;
};

export type ExternalUrls = {
  spotify: string;
};

export type ExternalIds = {
  isrc: string;
};

export type AudioFeatures = {
  danceability: number;
  energy: number;
  key: number;
  loudness: number;
  mode: number;
  speechiness: number;
  acousticness: number;
  instrumentalness: number;
  liveness: number;
  valence: number;
  tempo: number;
  type: "audio_features";
  id: string;
  uri: string;
  track_href: string;
  analysis_url: string;
  duration_ms: number;
  time_signature: number;
};

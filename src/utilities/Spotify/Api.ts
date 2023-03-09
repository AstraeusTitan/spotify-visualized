import { AuthToken } from "./Auth";

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

  _hasScopes(scopes: string[]): boolean {
    let checks = scopes.map((scope) => this.config.scopes.includes(scope));
    return !checks.includes(false);
  }

  _makeRequest(
    route: string,
    requiredScopes?: string[] | null | undefined,
    params?: QueryParams
  ) {
    if (this.config.fetch === undefined) {
      throw new Error("No fetch is defined");
    }

    if (requiredScopes && !this._hasScopes(requiredScopes)) {
      throw new Error(`Token missing scope`);
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

  // Album requests

  // Artist requests

  // Player Requests
  getRecentlyPlayed(params?: RecentlyPlayedTracksQuery) {
    return this._makeRequest(
      "/me/player/recently-played",
      ["user-read-recently-played"],
      params
    ) as Promise<RecentlyPlayedTracksResponse>;
  }

  // Playlist requests

  // Search requests

  // Tracks requests
  getTracksAudioFeatures(params: TracksAudioFeaturesQuery) {
    return this._makeRequest("/audio-features", null, {
      ids: params.ids,
    }) as Promise<TracksAudioFeaturesResponse>;
  }

  // User requests
  getCurrentUsersProfile() {
    return this._makeRequest("/me") as Promise<Profile>;
  }

  getUsersTopItems(type: "artists" | "tracks", params?: UsersTopItemsQuery) {
    return this._makeRequest(
      `/me/top/${type}`,
      ["user-top-read"],
      params
    ) as Promise<UsersTopItemsResponse>;
  }
}

export default Api;

export type ApiConfig = {
  token?: AuthToken;
  scopes: string[];
  fetch?: (input: string, init?: any) => Promise<any>;
};

export type QueryParams =
  | RecentlyPlayedTracksQuery
  | TracksAudioFeaturesQuery
  | UsersTopItemsQuery
  | CurrentUsersPlaylistsQuery;

export type RecentlyPlayedTracksQuery = {
  [key: string]: number | undefined;
  limit?: number;
  after?: number;
  before?: number;
};

export type RecentlyPlayedTracksResponse = {
  href: string;
  limit: number;
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: RecentlyPlayedTrack[];
};

export type TracksAudioFeaturesQuery = {
  [key: string]: string | number[] | undefined;
  ids: string | number[];
};

export type TracksAudioFeaturesResponse = {
  audio_features: AudioFeatures[];
};

export type CurrentUsersPlaylistsQuery = {
  [key: string]: number | undefined;
  limit?: number;
  offset?: number;
};

export type CurrentUsersPlaylistsResponse = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Playlist & { tracks: { href: string; total: number } | null[] }[];
};

export type UsersTopItemsQuery = {
  [key: string]: string | number | undefined;
  limit?: number;
  offset?: number;
  time_range?: "short_term" | "medium_term" | "long_term";
};

export type UsersTopItemsResponse = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[] | Artist[];
};

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
  [key: string]: any;
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

export type User = {
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  type: "user";
  uri: string;
};

export type Profile = User & {
  country?: string;
  display_name: string | null;
  email?: string;
  explicit_content?: ExplicitContent;
  images: Image[];
  product?: string;
};

export type Playlist = {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: User & {
    display_name: string | null;
  };
  public: boolean | null;
  snapshot_id: string;
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: PlaylistTrack[];
  };
};

export type PlaylistTrack = {
  added_at: string;
  added_by: User;
  is_local: boolean;
  track: Track;
};

export type Followers = {
  href: null;
  total: number;
};

export type ExplicitContent = {
  filter_enabled: boolean;
  filter_locked: boolean;
};

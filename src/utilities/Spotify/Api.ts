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
      if (params[key] === undefined) {
        return;
      }

      return `${encodeURIComponent(key)}=${encodeURIComponent(
        params[key] as any
      )}`;
    });

    const nonEmptyStrings = strings.filter(Boolean);
    if (nonEmptyStrings.length === 0) {
      return "";
    }
    return `?${nonEmptyStrings.join("&")}`;
  }

  _hasScopes(scopes: string[]): boolean {
    const checks = scopes.map((scope) => this.config.scopes?.includes(scope));
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
  getAlbum(id: string, params?: AlbumQuery) {
    return this._makeRequest(
      `/albums/${id}`,
      null,
      params
    ) as Promise<AlbumResponse>;
  }

  getAlbumTracks(id: string, params?: AlbumTracksQuery) {
    return this._makeRequest(
      `/albums/${id}/tracks`,
      null,
      params
    ) as Promise<AlbumTracksResponse>;
  }

  getCurrentUsersSavedAlbums(params?: CurrentUsersSavedAlbumsQuery) {
    return this._makeRequest(
      "/me/albums",
      ["user-library-read"],
      params
    ) as Promise<CurrentUsersSavedAlbumsResponse>;
  }

  // Artist requests
  getArtist(id: string, params?: ArtistQuery) {
    return this._makeRequest(
      `/artists/${id}`,
      null,
      params
    ) as Promise<ArtistResponse>;
  }

  // Player Requests
  getRecentlyPlayed(params?: RecentlyPlayedTracksQuery) {
    return this._makeRequest(
      "/me/player/recently-played",
      ["user-read-recently-played"],
      params
    ) as Promise<RecentlyPlayedTracksResponse>;
  }

  // Playlist requests
  getPlaylist(id: string, params?: PlaylistQuery) {
    return this._makeRequest(
      `/playlists/${id}`,
      null,
      params
    ) as Promise<PlaylistResponse>;
  }

  getCurrentUsersPlaylists(params?: CurrentUsersPlaylistsQuery) {
    return this._makeRequest(
      "/me/playlists",
      ["playlist-read-private", "playlist-read-collaborative"],
      params
    ) as Promise<CurrentUsersPlaylistsResponse>;
  }

  // Search requests

  // Tracks requests
  getTrack(id: string, params?: TrackQuery) {
    return this._makeRequest(
      `/tracks/${id}`,
      null,
      params
    ) as Promise<TrackResponse>;
  }

  getTrackAudioFeatures(params: TrackAudioFeaturesQuery) {
    return this._makeRequest(
      `/audio-features/${params.id}`
    ) as Promise<TrackAudioFeaturesResponse>;
  }

  getTracksAudioFeatures(params: TracksAudioFeaturesQuery) {
    return this._makeRequest(
      "/audio-features",
      null,
      params
    ) as Promise<TracksAudioFeaturesResponse>;
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
  scopes?: string[];
  fetch?: (input: string, init?: any) => Promise<any>;
};

export type QueryParams =
  | TrackQuery
  | TrackAudioFeaturesQuery
  | TracksAudioFeaturesQuery
  | PlaylistQuery
  | CurrentUsersPlaylistsQuery
  | UsersTopItemsQuery
  | ArtistQuery
  | AlbumQuery
  | AlbumTracksQuery
  | CurrentUsersSavedAlbumsQuery;

export type RecentlyPlayedTracksQuery = {
  [key: string]: number | undefined;
  limit?: number;
  after?: number;
  before?: number;
};

export type RecentlyPlayedTracksResponse = {
  error?: Error;
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

export type TrackQuery = {
  [key: string]: string | undefined;
  market?: string;
};

export type TrackResponse = Track & {
  error?: Error;
};

export type TrackAudioFeaturesQuery = {
  [key: string]: string | undefined;
};

export type TrackAudioFeaturesResponse = AudioFeatures & {
  error?: Error;
};

export type TracksAudioFeaturesQuery = {
  [key: string]: string | string[] | number[] | undefined;
  ids: string | string[] | number[];
};

export type TracksAudioFeaturesResponse = {
  error?: Error;
  audio_features: AudioFeatures[];
};

export type PlaylistQuery = {
  [key: string]: string | undefined;
  market?: string;
  fields?: string;
};

export type PlaylistResponse = FullPlaylist & {
  error?: Error;
};

export type CurrentUsersPlaylistsQuery = {
  [key: string]: number | undefined;
  limit?: number;
  offset?: number;
};

export type CurrentUsersPlaylistsResponse = {
  error?: Error;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: UserPlaylist[];
};

export type UsersTopItemsQuery = {
  [key: string]: string | number | undefined;
  limit?: number;
  offset?: number;
  time_range?: "short_term" | "medium_term" | "long_term";
};

export type UsersTopItemsResponse = {
  error?: Error;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[] | Artist[];
};

export type ArtistQuery = {
  [key: string]: string | undefined;
};

export type ArtistResponse = Artist & {
  error?: Error;
};

export type AlbumQuery = {
  [key: string]: string | undefined;
  market?: string;
};

export type AlbumTracksQuery = {
  [key: string]: string | number | undefined;
  market?: string;
  limit?: number;
  offset?: number;
};

export type AlbumResponse = Album & {
  error?: Error;
};

export type AlbumTracksResponse = {
  error?: Error;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[];
};

export type CurrentUsersSavedAlbumsQuery = {
  [key: string]: string | number | undefined;
  limit?: number;
  market?: string;
  offset?: number;
};

export type CurrentUsersSavedAlbumsResponse = {
  error?: Error;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
  items: SavedAlbum[];
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
  restrictions: Resctriction;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: "track";
  uri: string;
  is_local: boolean;
};

export type Artist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
};

export type Album = {
  album_type: "single" | "album" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  release_date: string;
  release_date_precision: "year" | "month" | "day";
  restrictions: Resctriction;
  type: "album";
  uri: string;
  copyrights: Copyright[];
  external_ids: ExternalIds;
  genres: string[];
  label: string;
  popularity: number;
  artists: Artist[];
  tracks: Track[];
};

export type SavedAlbum = {
  added_at: string;
  album: Album;
};

export type Image = {
  url: string;
  height: number | null;
  width: number | null;
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
  followers?: Followers;
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

export type Owner = User & {
  display_name: string | null;
};

export type UserPlaylist = PlaylistBase & {
  tracks: {
    href: string;
    total: number;
  };
};

export type FullPlaylist = PlaylistBase & {
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

export type PlaylistBase = {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  followers?: Followers;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: Owner;
  public: boolean | null;
  _public: boolean | null;
  snapshot_id: string;
  type: "playlist";
  uri: string;
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

export type Resctriction = {
  reason: "market" | "product" | "explicit" | string;
};

export type Error = {
  status: number;
  message: string;
};

export type Copyright = {
  text: string;
  type: "c" | "p" | string;
};

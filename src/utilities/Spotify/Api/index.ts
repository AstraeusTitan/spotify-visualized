import { AuthToken } from "../Auth";
import {
  GetAlbumResponse,
  GetAlbumTracksQuery,
  GetAlbumTracksResponse,
  GetCurrentUsersSavedAlbumsQuery,
  GetCurrentUsersSavedAlbumsResponse,
} from "./albums";
import {
  GetArtistResponse,
  GetSeveralArtistsQuery,
  GetSeveralArtistsResponse,
} from "./artists";
import { GetRecentlyPlayedQuery, GetRecentlyPlayedResponse } from "./player";
import {
  GetCurrentUsersPlaylistsQuery,
  GetCurrentUsersPlaylistsResponse,
  GetPlaylistQuery,
  GetPlaylistResponse,
} from "./playlists";
import {
  GetSeveralTrackAudioFeaturesQuery,
  GetSeveralTrackAudioFeaturesResponse,
  GetSeveralTracksQuery,
  GetSeveralTracksResponse,
  GetTrackAudioFeaturesResponse,
  GetTrackQuery,
  GetTrackResponse,
} from "./tracks";
import {
  GetUsersTopItemsQuery,
  GetUsersTopItemsResponse,
  Profile,
} from "./users";

export type ApiConfig = {
  token?: AuthToken;
  scopes?: string[];
  fetch?: (input: string, init?: any) => Promise<any>;
};

class Api {
  baseUrl = "https://api.spotify.com/v1";
  config: ApiConfig;

  _buildQuery!: (params?: any) => string;
  _hasScopes!: (scopes: string[]) => boolean;
  _makeRequest!: (
    route: string,
    requiredScopes?: string[] | null | undefined,
    params?: any
  ) => Promise<any>;

  // Album methods
  getAlbum!: (id: string) => Promise<GetAlbumResponse>;
  getAlbumTracks!: (
    id: string,
    params?: GetAlbumTracksQuery
  ) => Promise<GetAlbumTracksResponse>;

  // Artist methods
  getArtist!: (id: string) => Promise<GetArtistResponse>;
  getSeveralArtists!: (
    params?: GetSeveralArtistsQuery
  ) => Promise<GetSeveralArtistsResponse>;
  getCurrentUsersSavedAlbums!: (
    params?: GetCurrentUsersSavedAlbumsQuery
  ) => Promise<GetCurrentUsersSavedAlbumsResponse>;

  // Player methods
  getRecentlyPlayed!: (
    params?: GetRecentlyPlayedQuery
  ) => Promise<GetRecentlyPlayedResponse>;

  // Playlist methods
  getPlaylist!: (
    id: string,
    params?: GetPlaylistQuery
  ) => Promise<GetPlaylistResponse>;
  getCurrentUsersPlaylists!: (
    params?: GetCurrentUsersPlaylistsQuery
  ) => Promise<GetCurrentUsersPlaylistsResponse>;

  // Track methods
  getTrack!: (id: string, params?: GetTrackQuery) => Promise<GetTrackResponse>;
  getSeveralTracks!: (
    params: GetSeveralTracksQuery
  ) => Promise<GetSeveralTracksResponse>;
  getTrackAudioFeatures!: (
    id: string
  ) => Promise<GetTrackAudioFeaturesResponse>;
  getSeveralTrackAudioFeatures!: (
    params: GetSeveralTrackAudioFeaturesQuery
  ) => Promise<GetSeveralTrackAudioFeaturesResponse>;

  // User methods
  getCurrentUsersProfile!: () => Promise<Profile>;
  getUsersTopItems!: (
    type: "artists" | "tracks",
    params?: GetUsersTopItemsQuery
  ) => Promise<GetUsersTopItemsResponse>;

  constructor(config: ApiConfig) {
    this.config = config;
  }
}

export default Api;

// Add methods to prototype
require("./albums");
require("./artists");
require("./core");
require("./player");
require("./playlists");
require("./tracks");
require("./users");

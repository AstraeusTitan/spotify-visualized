import Api from ".";
import { ExternalUrls, Followers, RequestError, SpotifyImage } from "./common";
import { Track } from "./tracks";
import { Owner, User } from "./users";

// -----------------------------------------------------------
export interface PlaylistBase {
  collaborative: boolean;
  description: string | null;
  external_urls: ExternalUrls;
  followers?: Followers;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: Owner;
  public: boolean | null;
  _public: boolean | null;
  snapshot_id: string;
  type: "playlist";
  uri: string;
}

export interface PlaylistTrack {
  added_at: string;
  added_by: User;
  is_local: boolean;
  track: Track;
}

export interface FullPlaylist extends PlaylistBase {
  tracks: {
    href: string;
    limit: number;
    next: string;
    offset: number;
    previous: string;
    total: number;
    items: PlaylistTrack[];
  };
}

export interface UserPlaylist extends PlaylistBase {
  tracks: {
    href: string;
    total: number;
  };
}

// -----------------------------------------------------------
export interface GetPlaylistQuery {
  [key: string]: string | undefined;
  market?: string;
  fields?: string;
}

Api.prototype.getPlaylist = function (
  id: string,
  params?: GetPlaylistQuery
): Promise<GetPlaylistResponse> {
  return this._makeRequest(`/playlists/${id}`, null, params);
};

export interface GetPlaylistResponse extends FullPlaylist {
  error?: RequestError;
}

// -----------------------------------------------------------
export interface GetCurrentUsersPlaylistsQuery {
  [key: string]: number | undefined;
  limit?: number;
  offset?: number;
}

Api.prototype.getCurrentUsersPlaylists = function (
  params?: GetCurrentUsersPlaylistsQuery
): Promise<GetCurrentUsersPlaylistsResponse> {
  return this._makeRequest(
    "/me/playlists",
    ["playlist-read-private", "playlist-read-collaborative"],
    params
  );
};

export interface GetCurrentUsersPlaylistsResponse {
  error?: Error;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: UserPlaylist[];
}

// -----------------------------------------------------------

import Api from ".";
import { Artist } from "./artists";
import {
  ExternalUrls,
  SpotifyImage,
  RequestError,
  Resctriction,
  Copyright,
  ExternalIds,
} from "./common";
import { Track } from "./tracks";

export interface Album {
  album_type: "single" | "album" | "compilation";
  total_tracks: number;
  available_markets: string[];
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
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
}

export interface SavedAlbum {
  added_at: string;
  album: Album;
}

// -----------------------------------------------------------
Api.prototype.getAlbum = function (id: string): Promise<GetAlbumResponse> {
  return this._makeRequest(`/albums/${id}`);
};

export interface GetAlbumResponse extends Album {
  error?: RequestError;
}

// -----------------------------------------------------------
export interface GetAlbumTracksQuery {
  [key: string]: string | number | undefined;
  market?: string;
  limit?: number;
  offset?: number;
}

Api.prototype.getAlbumTracks = function (
  id: string,
  params?: GetAlbumTracksQuery
): Promise<GetAlbumTracksResponse> {
  return this._makeRequest(`/albums/${id}/tracks`, null, params);
};

export interface GetAlbumTracksResponse {
  error?: RequestError;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[];
}

// -----------------------------------------------------------
export interface GetCurrentUsersSavedAlbumsQuery {
  [key: string]: string | number | undefined;
  limit?: number;
  market?: string;
  offset?: number;
}

Api.prototype.getCurrentUsersSavedAlbums = function (
  params?: GetCurrentUsersSavedAlbumsQuery
): Promise<GetCurrentUsersSavedAlbumsResponse> {
  return this._makeRequest("/me/albums", ["user-library-read"], params);
};

export interface GetCurrentUsersSavedAlbumsResponse {
  error?: RequestError;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string;
  total: number;
  items: SavedAlbum[];
}

// -----------------------------------------------------------

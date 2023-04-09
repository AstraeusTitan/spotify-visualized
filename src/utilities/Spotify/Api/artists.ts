import Api from ".";
import { Album } from "./albums";
import { ExternalUrls, SpotifyImage, Followers, RequestError } from "./common";
import { Track } from "./tracks";

export interface Artist {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  popularity: number;
  type: "artist";
  uri: string;
}

// -----------------------------------------------------------
Api.prototype.getArtist = function (id: string): Promise<GetArtistResponse> {
  return this._makeRequest(`/artists/${id}`);
};

export interface GetArtistResponse extends Artist {
  error?: RequestError;
}

// -----------------------------------------------------------
export interface GetSeveralArtistsQuery {
  [key: string]: string[] | number[] | undefined;
  ids?: string[] | number[];
}

Api.prototype.getSeveralArtists = function (
  params?: GetSeveralArtistsQuery
): Promise<GetSeveralArtistsResponse> {
  return this._makeRequest(`/artists`, null, params);
};

export interface GetSeveralArtistsResponse {
  error?: RequestError;
  artists?: Artist[];
}

// -----------------------------------------------------------
export interface GetArtistsTopTracksQuery {
  [key: string]: string | undefined;
  market?: string;
}

Api.prototype.getArtistsTopTracks = function (
  id: string,
  params?: GetArtistsTopTracksQuery
): Promise<GetArtistsTopTracksResponse> {
  return this._makeRequest(`/artists/${id}/top-tracks`, null, params);
};

export interface GetArtistsTopTracksResponse {
  error?: RequestError;
  tracks: Track[];
}

// -----------------------------------------------------------
type IncludeGroup = "album" | "single" | "appears_on" | "compilation";
export interface GetArtistsAlbumsQuery {
  include_groups?: IncludeGroup[];
  limit?: number;
  market?: string;
  offset?: number;
}

Api.prototype.getArtistsAlbums = function (
  id: string,
  params?: GetArtistsAlbumsQuery
): Promise<GetArtistsAlbumsResponse> {
  return this._makeRequest(`/artists/${id}/albums`, null, params);
};

export interface GetArtistsAlbumsResponse {
  error?: RequestError;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Album[];
}

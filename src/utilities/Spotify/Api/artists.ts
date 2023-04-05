import Api from ".";
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

import Api from ".";
import { Album } from "./albums";
import { Artist } from "./artists";
import {
  ExternalIds,
  ExternalUrls,
  Resctriction,
  RequestError,
} from "./common";

// -----------------------------------------------------------
export interface Track {
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
}

export interface AudioFeatures {
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
}

// -----------------------------------------------------------
export interface GetTrackQuery {
  [key: string]: string | undefined;
  market?: string;
}

Api.prototype.getTrack = function (
  id: string,
  params?: GetTrackQuery
): Promise<GetTrackResponse> {
  return this._makeRequest(`/tracks/${id}`, null, params);
};

export interface GetTrackResponse extends Track {
  error?: RequestError;
}

// -----------------------------------------------------------
export interface GetSeveralTracksQuery {
  [key: string]: string | string[] | number[] | undefined;
  ids: string[] | number[];
  market?: string;
}

Api.prototype.getSeveralTracks = function (
  params: GetSeveralTracksQuery
): Promise<GetSeveralTracksResponse> {
  return this._makeRequest(`/tracks`, null, params);
};

export interface GetSeveralTracksResponse {
  error?: RequestError;
  tracks: Track[];
}

// -----------------------------------------------------------
Api.prototype.getTrackAudioFeatures = function (
  id: string
): Promise<GetTrackAudioFeaturesResponse> {
  return this._makeRequest(`/audio-features/${id}`);
};

export interface GetTrackAudioFeaturesResponse extends AudioFeatures {
  error?: RequestError;
}

// -----------------------------------------------------------
export interface GetSeveralTrackAudioFeaturesQuery {
  [key: string]: string | string[] | number[] | undefined;
  ids: string | string[] | number[];
}

Api.prototype.getSeveralTrackAudioFeatures = function (
  params: GetSeveralTrackAudioFeaturesQuery
): Promise<GetSeveralTrackAudioFeaturesResponse> {
  return this._makeRequest("/audio-features", null, params);
};

export interface GetSeveralTrackAudioFeaturesResponse {
  error?: RequestError;
  audio_features: AudioFeatures[];
}

// -----------------------------------------------------------

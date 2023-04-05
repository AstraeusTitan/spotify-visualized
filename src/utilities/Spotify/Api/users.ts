import Api from ".";
import { Artist } from "./artists";
import {
  ExplicitContent,
  ExternalUrls,
  Followers,
  SpotifyImage,
  RequestError,
} from "./common";
import { Track } from "./tracks";

// -----------------------------------------------------------
export interface User {
  external_urls: ExternalUrls;
  followers?: Followers;
  href: string;
  id: string;
  type: "user";
  uri: string;
}

export interface Profile extends User {
  country?: string;
  display_name: string | null;
  email?: string;
  explicit_content?: ExplicitContent;
  images: SpotifyImage[];
  product?: string;
}

export interface Owner extends User {
  display_name: string | null;
}

// -----------------------------------------------------------
Api.prototype.getCurrentUsersProfile = function (): Promise<Profile> {
  return this._makeRequest("/me");
};

// -----------------------------------------------------------
export interface GetUsersTopItemsQuery {
  [key: string]: string | number | undefined;
  limit?: number;
  offset?: number;
  time_range?: "short_term" | "medium_term" | "long_term";
}

Api.prototype.getUsersTopItems = function (
  type: "artists" | "tracks",
  params?: GetUsersTopItemsQuery
): Promise<GetUsersTopItemsResponse> {
  return this._makeRequest(`/me/top/${type}`, ["user-top-read"], params);
};

export interface GetUsersTopItemsResponse {
  error?: RequestError;
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Track[] | Artist[];
}

// -----------------------------------------------------------

import Api from ".";
import { Context, RequestError } from "./common";
import { Track } from "./tracks";

// -----------------------------------------------------------
export interface RecentlyPlayedTrack {
  context?: Context;
  played_at: string;
  track: Track;
}

// -----------------------------------------------------------
export interface GetRecentlyPlayedQuery {
  [key: string]: number | undefined;
  limit?: number;
  after?: number;
  before?: number;
}

Api.prototype.getRecentlyPlayed = function (
  params?: GetRecentlyPlayedQuery
): Promise<GetRecentlyPlayedResponse> {
  return this._makeRequest(
    "/me/player/recently-played",
    ["user-read-recently-played"],
    params
  );
};

export interface GetRecentlyPlayedResponse {
  error?: RequestError;
  href: string;
  limit: number;
  next: string | null;
  cursors: {
    after: string;
    before: string;
  };
  total: number;
  items: RecentlyPlayedTrack[];
}

// -----------------------------------------------------------

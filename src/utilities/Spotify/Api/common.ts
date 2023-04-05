// Common types
export interface SpotifyImage {
  url: string;
  height: number | null;
  width: number | null;
}

export interface ExternalUrls {
  spotify: string;
}

export interface ExternalIds {
  isrc: string;
}

export interface Followers {
  href: null;
  total: number;
}

export interface ExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface Resctriction {
  reason: "market" | "product" | "explicit" | string;
}

export interface RequestError {
  status: number;
  message: string;
}

export interface Copyright {
  text: string;
  type: "c" | "p" | string;
}

export interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

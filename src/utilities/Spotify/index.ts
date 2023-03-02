import Api, { ApiConfig } from "./Api";
import Auth, { AuthConfig } from "./Auth";

export type SpotifyConfig = AuthConfig & ApiConfig;

class Spotify {
  config: SpotifyConfig;
  Auth: Auth;
  Api: Api;

  constructor(config: SpotifyConfig) {
    this.config = config;
    this.Auth = new Auth(this.config);
    this.Api = new Api(this.config);
  }
}

export default Spotify;

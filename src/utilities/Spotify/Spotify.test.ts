import Spotify, { SpotifyConfig } from ".";

let passedConfig: SpotifyConfig;
describe("Spotify", () => {
  beforeEach(() => {
    passedConfig = {
      clientId: "CLIENT_ID",
      token: {
        accessToken: "TOKEN",
        expiresAt: 0,
      },
      scopes: ["SCOPE_1", "SCOPE_2"],
      redirectUri: "example.com/callback",
      storage: {
        getItem: (key) => key,
        setItem: (key, value) => {},
      },
    };
  });

  describe("constructor", () => {
    it("should link all congfigs", () => {
      const spotify = new Spotify(passedConfig);
      expect(spotify.config).toBe(spotify.Api.config);
      expect(spotify.config).toBe(spotify.Auth.config);
    });
  });
});

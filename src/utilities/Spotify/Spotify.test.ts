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

  describe("Auth", () => {
    let spotify: Spotify, mock: any;
    beforeEach(() => {
      spotify = new Spotify(passedConfig);
      mock = {
        open: (url?: string, target?: string, features?: string) => {
          return this;
        },
      };
    });

    describe("openLoginPopup", () => {
      it("should call the correct url", () => {
        const spy = jest.spyOn(mock, "open");
        spotify.Auth.openLoginPopup(mock);
        expect(spy).toHaveBeenCalledWith(
          spotify.Auth._url(spotify.Auth._checkState),
          "Login with Spotify",
          "width=600, height=800"
        );
      });
    });
  });
});

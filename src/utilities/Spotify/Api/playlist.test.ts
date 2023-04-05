import Api, { ApiConfig } from ".";

let passedConfig: ApiConfig;
let mock: any, api: Api, fetchSpy: any;

describe("Api.Playlist", () => {
  beforeEach(() => {
    mock = {
      fetch: (input: string, init?: any) =>
        new Promise((resolve, reject) => input),
    };
    fetchSpy = jest.spyOn(mock, "fetch");

    passedConfig = {
      token: {
        accessToken: "TOKEN",
        expiresAt: 0,
      },
      scopes: ["playlist-read-private", "playlist-read-collaborative"],
    };

    api = new Api({ ...passedConfig, fetch: fetchSpy });
  });

  describe("getPlaylist", () => {
    it("should call fetch with the correct args", () => {
      const route = "/playlists/1234";

      api.getPlaylist("1234");
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getCurrentUsersPlaylists", () => {
    it("should throw if scope is missing", () => {
      api.config.scopes = [];

      expect(() => api.getCurrentUsersPlaylists()).toThrow();
    });

    it("should call fetch with the correct args", () => {
      const route = "/me/playlists";

      api.getCurrentUsersPlaylists();
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should call fetch with the correct args when params set", () => {
      const route = "/me/playlists";
      const query = "?limit=50";

      api.getCurrentUsersPlaylists({ limit: 50 });
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

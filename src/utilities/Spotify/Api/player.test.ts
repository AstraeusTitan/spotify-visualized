import Api, { ApiConfig } from ".";

let passedConfig: ApiConfig;
let mock: any, api: Api, fetchSpy: any;

describe("Api.Player", () => {
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
      scopes: ["user-read-recently-played"],
    };

    api = new Api({ ...passedConfig, fetch: fetchSpy });
  });

  describe("getRecentlyPlayed", () => {
    it("should throw if scope is missing", () => {
      api.config.scopes = [];
      api.config.fetch = mock.fetch;

      expect(() => api.getRecentlyPlayed()).toThrow();
    });

    it("should call fetch with the correct args", () => {
      const route = "/me/player/recently-played";

      api.getRecentlyPlayed();
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should call fetch with the correct args when params set", () => {
      const route = "/me/player/recently-played";
      const query = "?limit=50";

      api.getRecentlyPlayed({ limit: 50 });
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

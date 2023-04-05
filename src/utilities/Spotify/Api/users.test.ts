import Api, { ApiConfig } from ".";

let passedConfig: ApiConfig;
let mock: any, api: Api, fetchSpy: any;

describe("Api.Users", () => {
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
      scopes: ["user-top-read"],
    };

    api = new Api({ ...passedConfig, fetch: fetchSpy });
  });

  describe("getCurrentUsersProfile", () => {
    it("should call fetch with the correct args", () => {
      const route = "/me";

      api.getCurrentUsersProfile();
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getUsersTopItems", () => {
    it("should throw if scope is missing", () => {
      api.config.scopes = [];
      api.config.fetch = mock.fetch;

      expect(() => api.getUsersTopItems("tracks")).toThrow();
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me/top/tracks";

      api.getUsersTopItems("tracks");
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should call fetch with the correct args when params set", () => {
      const route = "/me/top/tracks";
      const query = "?limit=50";

      api.getUsersTopItems("tracks", { limit: 50 });
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

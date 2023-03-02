import Api, { ApiConfig, QueryParams } from "./Api";

let passedConfig: ApiConfig;
describe("Spotify.Api", () => {
  beforeEach(() => {
    passedConfig = {
      token: {
        accessToken: "TOKEN",
        expiresAt: 0,
      },
      scopes: ["SCOPE_1", "SCOPE_2"],
    };
  });

  describe("constructor", () => {
    it("should store a ref to the passed config", () => {
      const api = new Api(passedConfig);
      expect(api.config).toBe(passedConfig);
    });
  });

  describe("_buildQuery", () => {
    let api: Api;
    beforeEach(() => {
      api = new Api(passedConfig);
    });
    it("should return an empty string if no params", () => {
      const query = api._buildQuery();
      expect(query).toBe("");
    });

    it("should create a valid query string", () => {
      const query = api._buildQuery({ limit: 50 });
      expect(query).toBe("?limit=50");
    });

    it("should work with multiple params", () => {
      const query = api._buildQuery({ limit: 50, ids: "1,2,3" });
      expect(query).toBe("?limit=50&ids=1%2C2%2C3");
    });
  });

  describe("_hasScope", () => {
    let api: Api;
    beforeEach(() => {
      api = new Api(passedConfig);
    });

    it("should return true when scope is available", () => {
      expect(api._hasScope("SCOPE_1")).toBe(true);
    });

    it("should return false when scope is not available", () => {
      expect(api._hasScope("SCOPE_3")).toBe(false);
    });
  });

  describe("_makeRequest", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig });
    });

    it("should throw error if no fetch is undefined", () => {
      expect(() => api._makeRequest("route")).toThrow();
    });

    it("should call fetch with the correct url with no query", () => {
      const spy = jest.spyOn(mock, "fetch");
      const route = "/me";
      api.config.fetch = spy as any;
      expect(api.config.fetch).toBeDefined();
      api._makeRequest(route);
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should call fetch with the correct url and query", () => {
      const spy = jest.spyOn(mock, "fetch");
      const route = "/me";
      api.config.fetch = spy as any;
      expect(api.config.fetch).toBeDefined();
      api._makeRequest(route, null, { limit: 50 });
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}?limit=50`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should throw error on missing scope", () => {
      expect(() => api._makeRequest("route", "SCOPE_3")).toThrow();
    });

    it("should not trow when scope is available", () => {
      expect(() => api._makeRequest("/route", "SCOPE_1")).toThrow();
    });
  });

  describe("getRecentlyPlayed", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig, scopes: ["user-read-recently-played"] });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me/player/recently-played";
      const query = "?limit=20";
      api.getRecentlyPlayed();
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should call fetch with the correct args when params set", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me/player/recently-played";
      const query = "?limit=50";
      api.getRecentlyPlayed({ limit: 50 });
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getTracksAudioFeatures", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig, scopes: ["user-read-recently-played"] });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/audio-features";
      const query = `?ids=${encodeURIComponent([1, 2, 3].join(","))}`;
      api.getTracksAudioFeatures({ ids: [1, 2, 3] });
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

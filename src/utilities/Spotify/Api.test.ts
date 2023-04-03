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
      expect(api._hasScopes(["SCOPE_1"])).toBe(true);
    });

    it("should return true when all scopes are available", () => {
      expect(api._hasScopes(["SCOPE_1", "SCOPE_2"])).toBe(true);
    });

    it("should return false when scope is not available", () => {
      expect(api._hasScopes(["SCOPE_3"])).toBe(false);
    });

    it("should return false when not all scopes are available", () => {
      expect(api._hasScopes(["SCOPE_2", "SCOPE_3"])).toBe(false);
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

    it("should not include params with undefined value", () => {
      const spy = jest.spyOn(mock, "fetch");
      const route = "/me";
      api.config.fetch = spy as any;
      expect(api.config.fetch).toBeDefined();
      api._makeRequest(route, null, { ids: undefined });
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
      expect(() => api._makeRequest("route", ["SCOPE_3"])).toThrow();
    });

    it("should not trow when scope is available", () => {
      expect(() => api._makeRequest("/route", ["SCOPE_1"])).toThrow();
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

    it("should throw if scope is missing", () => {
      api.config.scopes = [];
      api.config.fetch = mock.fetch;

      expect(() => api.getRecentlyPlayed()).toThrow();
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me/player/recently-played";

      api.getRecentlyPlayed();
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
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

  describe("getTrack", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/tracks/1234";

      api.getTrack("1234");
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getTrackAudioFeaatures", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/audio-features/1234";

      api.getTrackAudioFeatures({ id: "1234" });
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
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
      api = new Api({ ...passedConfig });
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

  describe("getCurrentUsersProfile", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me";

      api.getCurrentUsersProfile();
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getUsersTopItems", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig, scopes: ["user-top-read"] });
    });

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
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me/top/tracks";
      const query = "?limit=50";

      api.getUsersTopItems("tracks", { limit: 50 });
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getPlaylist", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/playlists/1234";

      api.getPlaylist("1234");
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getCurrentUsersPlaylists", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({
        ...passedConfig,
        scopes: ["playlist-read-private", "playlist-read-collaborative"],
      });
    });

    it("should throw if scope is missing", () => {
      api.config.scopes = [];
      api.config.fetch = mock.fetch;

      expect(() => api.getCurrentUsersPlaylists()).toThrow();
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me/playlists";

      api.getCurrentUsersPlaylists();
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should call fetch with the correct args when params set", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/me/playlists";
      const query = "?limit=50";

      api.getCurrentUsersPlaylists({ limit: 50 });
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getArtist", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/artists/1234";

      api.getArtist("1234");
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getAlbum", () => {
    let mock: any, api: Api;
    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig });
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const route = "/albums/1234";

      api.getAlbum("1234");
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getCurrentUsersSavedAlbums", () => {
    let mock: any, api: Api;
    const route = "/me/albums";

    beforeEach(() => {
      mock = {
        fetch: (input: string, init?: any) =>
          new Promise((resolve, reject) => input),
      };
      api = new Api({ ...passedConfig, scopes: ["user-library-read"] });
    });

    it("should throw if scope is missing", () => {
      api.config.scopes = [];
      api.config.fetch = mock.fetch;

      expect(() => api.getCurrentUsersSavedAlbums()).toThrow();
    });

    it("should call fetch with the correct args", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;

      api.getCurrentUsersSavedAlbums();
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });

    it("should call fetch with the correct args when params set", () => {
      const spy = jest.spyOn(mock, "fetch");
      api.config.fetch = spy as any;
      const query = "?limit=50";

      api.getCurrentUsersSavedAlbums({ limit: 50 });
      expect(spy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

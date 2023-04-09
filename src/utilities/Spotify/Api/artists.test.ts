import Api, { ApiConfig } from ".";

let passedConfig: ApiConfig;
let mock: any, api: Api, fetchSpy: any;
describe("Api.Artists", () => {
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
      scopes: ["SCOPE_1", "SCOPE_2"],
    };

    api = new Api({ ...passedConfig, fetch: fetchSpy });
  });

  describe("getArtist", () => {
    it("should add method to prototype", () => {
      expect(api.getArtist).not.toBeUndefined();
    });

    it("should call fetch with the correct args", () => {
      const route = "/artists/1234";

      api.getArtist("1234");
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getSeveralArtist", () => {
    it("should add method to prototype", () => {
      expect(api.getSeveralArtists).not.toBeUndefined();
    });

    it("should call fetch with the correct args", () => {
      const route = "/artists";
      const query = `?ids=${encodeURIComponent([1, 2, 3].join(","))}`;

      api.getSeveralArtists({ ids: [1, 2, 3] });
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getArtistsTopTracks", () => {
    it("should add method to prototype", () => {
      expect(api.getArtistsTopTracks).not.toBeUndefined();
    });

    it("should call fetch with the correct args", () => {
      const route = "/artists/1234/top-tracks";

      api.getArtistsTopTracks("1234");
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getArtistsAlbums", () => {
    it("should add method to prototype", () => {
      expect(api.getArtistsAlbums).not.toBeUndefined();
    });

    it("should call fetch with the correct args", () => {
      const route = "/artists/1234/albums";
      const query = `?include_groups=${encodeURIComponent(
        ["single", "appears_on"].join(",")
      )}`;

      api.getArtistsAlbums("1234", {
        include_groups: ["single", "appears_on"],
      });
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

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
      scopes: ["user-library-read"],
    };

    api = new Api({ ...passedConfig, fetch: fetchSpy });
  });

  describe("getAlbum", () => {
    it("should add method to prototype", () => {
      expect(api.getAlbum).not.toBeUndefined();
    });

    it("should call fetch with the correct args", () => {
      const route = "/albums/1234";

      api.getAlbum("1234");
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getAlbumTracks", () => {
    it("should add method to prototype", () => {
      expect(api.getAlbumTracks).not.toBeUndefined();
    });

    it("should call fetch with the correct args", () => {
      const route = "/albums/1234/tracks";

      api.getAlbumTracks("1234");
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getCurrentUsersSavedAlbums", () => {
    it("should add method to prototype", () => {
      expect(api.getCurrentUsersSavedAlbums).not.toBeUndefined();
    });

    it("should call fetch with the correct args", () => {
      const route = "/me/albums";

      api.getCurrentUsersSavedAlbums();
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

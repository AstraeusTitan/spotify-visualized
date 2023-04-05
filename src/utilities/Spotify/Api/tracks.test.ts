import Api, { ApiConfig } from ".";

let passedConfig: ApiConfig;
let mock: any, api: Api, fetchSpy: any;

describe("Api.Tracks", () => {
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

  describe("getTrack", () => {
    it("should call fetch with the correct args", () => {
      const route = "/tracks/1234";

      api.getTrack("1234");
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getSeveralTracks", () => {
    it("should call fetch with the correct args", () => {
      const route = "/tracks";
      const query = `?ids=${encodeURIComponent([1, 2, 3].join(","))}`;

      api.getSeveralTracks({ ids: [1, 2, 3] });
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getTrackAudioFeaatures", () => {
    it("should call fetch with the correct args", () => {
      const route = "/audio-features/1234";

      api.getTrackAudioFeatures("1234");
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });

  describe("getSeveralTrackAudioFeatures", () => {
    it("should call fetch with the correct args", () => {
      const route = "/audio-features";
      const query = `?ids=${encodeURIComponent([1, 2, 3].join(","))}`;

      api.getSeveralTrackAudioFeatures({ ids: [1, 2, 3] });
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}${query}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
    });
  });
});

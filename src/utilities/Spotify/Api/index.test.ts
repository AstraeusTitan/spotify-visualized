import Api, { ApiConfig } from ".";

let passedConfig: ApiConfig;
let api: Api;

describe("Api", () => {
  beforeEach(() => {
    passedConfig = {
      token: {
        accessToken: "TOKEN",
        expiresAt: 0,
      },
      scopes: ["SCOPE_1", "SCOPE_2"],
    };

    api = new Api(passedConfig);
  });

  describe("constructor", () => {
    it("should store a ref to the passed config", () => {
      expect(api.config).toBe(passedConfig);
    });
  });
});

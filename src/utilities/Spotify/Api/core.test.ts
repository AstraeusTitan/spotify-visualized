import Api, { ApiConfig } from ".";

let passedConfig: ApiConfig;
let mock: any, api: Api, fetchSpy: any;

describe("Api.Core", () => {
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

  describe("_buildQuery", () => {
    it("should be defined on the instance", () => {
      expect(api._buildQuery).not.toBeUndefined();
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
    it("should be defined on the instance", () => {
      expect(api._hasScopes).not.toBeUndefined();
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
    it("should be defined on the instance", () => {
      expect(api._makeRequest).not.toBeUndefined();
    });

    it("should throw error if no fetch is undefined", () => {
      api.config.fetch = undefined;
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

    it("should not throw when scope is available", () => {
      expect(() => api._makeRequest("/route", ["SCOPE_1"])).not.toThrow();
    });
  });

  describe("_requestAllPages", () => {
    beforeEach(() => {
      mock.count = 0;
      mock.fetch = (input: string, init?: any): Promise<any> => {
        return new Promise((resolve, reject) => {
          let page = {
            offset: mock.count * 10,
            limit: (mock.count + 1) * 10,
            next: mock.count < 4,
            items: [mock.count],
          };
          mock.count += 1;
          resolve({
            json: () => page,
          });
        });
      };
      fetchSpy = jest.spyOn(mock, "fetch") as any;
      api = new Api({ ...passedConfig, fetch: fetchSpy });
    });
    it("should be defined on the instance", () => {
      expect(api._requestAllPages).not.toBeUndefined();
    });

    // TODO: Figure out how to mock this
    it("should make multiple fetch calls", async () => {
      const route = "/me";
      const result = await api._requestAllPages(route);
      expect(fetchSpy).toBeCalledWith(`${api.baseUrl}${route}`, {
        headers: {
          Authorization: `Bearer TOKEN`,
          "Content-Type": "application/json",
        },
      });
      expect(fetchSpy).toBeCalledTimes(5);
      expect(result.items).toEqual([0, 1, 2, 3, 4]);
      expect(result.offset).toBe(40);
      expect(result.limit).toBe(50);
    });
  });
});

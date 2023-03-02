import Auth, { AuthConfig, AuthToken } from "./Auth";

let passedConfig: AuthConfig;
describe("Spotify.Auth", () => {
  beforeEach(() => {
    passedConfig = {
      clientId: "CLIENT_ID",
      scopes: ["SCOPE_1", "SCOPE_2"],
      redirectUri: "example.com/callback",
      storage: {
        getItem: (key) => key,
        setItem: (key, value) => {},
      },
    };
  });

  describe("constructor", () => {
    it("should store a ref to the passed config", () => {
      const auth = new Auth(passedConfig);
      expect(auth.config).toBe(passedConfig);
    });
  });

  describe("generateCheckState", () => {
    let auth: Auth;
    beforeEach(() => {
      auth = new Auth(passedConfig);
    });

    it("should generate a check state", () => {
      const generatedState = auth.generateCheckState();
      expect(typeof generatedState).toBe("string");
      expect(generatedState.length).toBeGreaterThan(1);
    });

    it("should default to using Math.random", () => {
      const spy = jest.spyOn(Math, "random");
      auth.generateCheckState();
      expect(spy).toHaveBeenCalled();
    });

    it("should allow custom length and random function", () => {
      const mock = {
        random: () => 0,
      };
      const length = 4;
      const spy = jest.spyOn(mock, "random");
      const generatedState = auth.generateCheckState(length, mock.random);
      expect(generatedState.length).toBe(length);
      expect(generatedState).toBe("AAAA");
      expect(spy).toBeCalledTimes(length);
    });

    it("should store the generated state", () => {
      const generatedState = auth.generateCheckState();
      expect(auth._checkState).toBe(generatedState);
    });
  });

  describe("url", () => {
    let auth: Auth;
    beforeEach(() => {
      auth = new Auth(passedConfig);
    });

    it("should create a url using the passed config", () => {
      const baseUrl = "https://accounts.spotify.com/authorize?";
      const url = auth.url();
      const state = auth._checkState;

      expect(typeof url).toBe("string");
      expect(url.startsWith(baseUrl)).toBe(true);
      expect(
        url.indexOf(`client_id=${encodeURIComponent(passedConfig.clientId)}`)
      ).toBeGreaterThan(0);
      expect(
        url.indexOf(
          `redirect_uri=${encodeURIComponent(passedConfig.redirectUri)}`
        )
      ).toBeGreaterThan(0);
      expect(
        url.indexOf(
          `scope=${encodeURIComponent(passedConfig.scopes.join(" "))}`
        )
      ).toBeGreaterThan(0);
      expect(url.indexOf(`response_type=token`)).toBeGreaterThan(0);
      expect(url.indexOf(`state=${state}`)).toBeGreaterThan(0);
    });

    it("should use a passed state", () => {
      auth.generateCheckState();
      const url = auth.url(auth._checkState);
      expect(url.indexOf(`state=${auth._checkState}`)).toBeGreaterThan(0);
    });
  });

  describe("parseAuthResponse", () => {
    let auth: Auth, fragment: string, query: string;
    beforeEach(() => {
      auth = new Auth(passedConfig);
      fragment =
        "access_token=ACCESS_TOKEN&token_type=Bearer&expires_in=3600&state=123";
      query = "error=access_denied&state=123";
    });

    it("should return a token from a fragment", () => {
      const future = Math.floor(Date.now() / 1000) + 3600;
      const response = auth.parseAuthResponse(fragment);
      expect(response.accessToken).toBe("ACCESS_TOKEN");
      expect(response.state).toBe("123");
      expect(response.expiresAt).toBeGreaterThanOrEqual(future);
    });

    it("should return an error from a query", () => {
      const response = auth.parseAuthResponse(null, query);
      expect(response.error).toBe("access_denied");
      expect(response.state).toBe("123");
    });
  });

  describe("openLoginPopup", () => {
    let auth: Auth;
    let mock: any;
    beforeEach(() => {
      auth = new Auth(passedConfig);
      mock = {
        open: (url?: string, target?: string, features?: string) => {
          return this;
        },
      };
    });

    it("should call open on the provided target", () => {
      const spy = jest.spyOn(mock, "open");
      auth.openLoginPopup(mock);
      expect(spy).toHaveBeenCalledWith(
        auth.url(auth._checkState),
        "Login with Spotify",
        "width=600, height=800"
      );
    });

    it("should store Auth instance on target", () => {
      auth.openLoginPopup(mock);
      expect(mock.SpotifyAuth).toBe(auth);
    });
  });

  describe("handleCallback", () => {
    let auth: Auth, mock: any, fragment: string, query: string;
    beforeEach(() => {
      mock = {
        getItem: (key: string) => key,
        setItem: (key: string, value: string) => {},
        callback: (err: string, data: AuthToken) => {},
      };
      auth = new Auth({ ...passedConfig, storage: mock });
      fragment =
        "access_token=ACCESS_TOKEN&token_type=Bearer&expires_in=3600&state=123";
      query = "error=access_denied&state=123";
    });

    it("should clear the token if error", () => {
      const setSpy = jest.spyOn(mock, "setItem");
      auth.handleCallback(null, query);
      expect(setSpy).toBeCalledTimes(2);
      expect(setSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken, ""],
        [auth._storageKeys.expiresAt, "0"],
      ]);
      expect(auth.config.token).toBeUndefined();
    });

    it("should clear the token if state mismatch", () => {
      const setSpy = jest.spyOn(mock, "setItem");
      auth._checkState = "000";
      auth.handleCallback(fragment, null);
      expect(setSpy).toBeCalledTimes(2);
      expect(setSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken, ""],
        [auth._storageKeys.expiresAt, "0"],
      ]);
      expect(auth.config.token).toBeUndefined();
    });

    it("should set the token if success", () => {
      const setSpy = jest.spyOn(mock, "setItem");
      const future = Math.floor(Date.now() / 1000) + 3600;
      auth._checkState = "123";
      auth.handleCallback(fragment, null);
      expect(setSpy).toBeCalledTimes(2);
      expect(setSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken, "ACCESS_TOKEN"],
        [auth._storageKeys.expiresAt, future.toString()],
      ]);
      expect(auth.config.token?.accessToken).toBe("ACCESS_TOKEN");
      expect(auth.config.token?.expiresAt).toBe(future);
    });

    it("should call callback with error", () => {
      const callbackSpy = jest.spyOn(mock, "callback");
      auth._checkState = "123";
      auth.handleCallback(null, query, mock.callback);
      expect(callbackSpy).toBeCalledWith("access_denied");
    });

    it("should call callback with error on state mismatch", () => {
      const callbackSpy = jest.spyOn(mock, "callback");
      auth._checkState = "000";
      auth.handleCallback(null, query, mock.callback);
      expect(callbackSpy).toBeCalledWith("state_mismatch");
    });

    it("should call callback with success", () => {
      const callbackSpy = jest.spyOn(mock, "callback");
      const future = Math.floor(Date.now() / 1000) + 3600;
      auth._checkState = "123";
      auth.handleCallback(fragment, null, mock.callback);
      expect(callbackSpy).toBeCalledWith(null, {
        accessToken: "ACCESS_TOKEN",
        expiresAt: future,
      });
    });
  });

  describe("storeToken", () => {
    let auth: Auth;
    let mock: any;
    beforeEach(() => {
      mock = {
        getItem: (key: string) => key,
        setItem: (key: string, value: string) => {},
      };
      auth = new Auth({ ...passedConfig, storage: mock });
    });

    it("should clear any previously stored token", () => {
      const setSpy = jest.spyOn(mock, "setItem");
      expect(auth.config.token).toBeUndefined();
      auth.storeToken();
      expect(setSpy).toBeCalledTimes(2);
      expect(setSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken, ""],
        [auth._storageKeys.expiresAt, "0"],
      ]);
    });

    it("should call setItem on storage if token present", () => {
      const setSpy = jest.spyOn(mock, "setItem");
      auth.config.token = {
        accessToken: "TOKEN",
        expiresAt: 0,
      };
      auth.storeToken();
      expect(setSpy).toBeCalledTimes(2);
      expect(setSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken, "TOKEN"],
        [auth._storageKeys.expiresAt, "0"],
      ]);
    });
  });

  describe("setToken", () => {
    let auth: Auth;
    let mock: any;
    beforeEach(() => {
      mock = {
        getItem: (key: string) => key,
        setItem: (key: string, value: string) => {},
      };
      auth = new Auth({ ...passedConfig, storage: mock });
    });

    it("should set the token config and store it", () => {
      const setSpy = jest.spyOn(mock, "setItem");
      let token = {
        accessToken: "TOKEN",
        expiresAt: 0,
      };
      auth.setToken(token);
      expect(setSpy).toBeCalledTimes(2);
      expect(setSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken, "TOKEN"],
        [auth._storageKeys.expiresAt, "0"],
      ]);
      expect(auth.config.token).toBe(token);
    });
  });

  describe("clearToken", () => {
    let auth: Auth;
    let mock: any;
    beforeEach(() => {
      let token = {
        accessToken: "TOKEN",
        expiresAt: 0,
      };

      mock = {
        getItem: (key: string) => key,
        setItem: (key: string, value: string) => {},
      };
      auth = new Auth({ ...passedConfig, storage: mock, token: token });
    });

    it("should set the token config to undefined and overwrite stored token", () => {
      const setSpy = jest.spyOn(mock, "setItem");
      auth.clearToken();
      expect(setSpy).toBeCalledTimes(2);
      expect(setSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken, ""],
        [auth._storageKeys.expiresAt, "0"],
      ]);
      expect(auth.config.token).toBeUndefined();
    });
  });

  describe("loadToken", () => {
    let auth: Auth;
    let mock: any;
    beforeEach(() => {
      mock = {
        getItem: (key: string) => {
          switch (key) {
            case auth._storageKeys.accessToken:
              return "TOKEN";
            case auth._storageKeys.expiresAt:
              return "1000";
          }
        },
        setItem: (key: string, value: string) => {},
      };
      auth = new Auth({ ...passedConfig, storage: mock });
    });

    it("should get the token from storage", () => {
      const getSpy = jest.spyOn(mock, "getItem");
      const token = auth.loadToken();
      expect(getSpy).toBeCalledTimes(2);
      expect(getSpy.mock.calls).toEqual([
        [auth._storageKeys.accessToken],
        [auth._storageKeys.expiresAt],
      ]);
      expect(auth.config.token?.accessToken).toBe("TOKEN");
      expect(auth.config.token?.expiresAt).toBe(1000);
    });

    it("should set token in config", () => {
      const token = auth.loadToken();
      expect(auth.config.token).toBe(token);
    });
  });
});

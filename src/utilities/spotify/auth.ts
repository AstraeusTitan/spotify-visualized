const validationString = (
  length: number = 12,
  randomFn: () => number = Math.random
): string => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let text = "";
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(randomFn() * possible.length));
  }

  return text;
};

type TAuthURLProps = {
  clientID: string;
  redirectURI: string;
  scopes: string;
  checkString?: string;
};
const authURL = ({
  redirectURI,
  scopes,
  clientID,
  checkString = validationString(),
}: TAuthURLProps): { url: string; state: string } => {
  return {
    url: `https://accounts.spotify.com/authorize?client_id=${encodeURIComponent(
      clientID
    )}&redirect_uri=${encodeURIComponent(
      redirectURI
    )}&scope=${encodeURIComponent(
      scopes
    )}&response_type=token&state=${encodeURIComponent(
      checkString
    )}&show_dialog=true`,
    state: checkString,
  };
};

type TAuthResponse = {
  fragment?: string;
  query?: string;
};

type TResponseData = {
  accessToken: string | undefined;
  expiresIn: number | undefined;
  tokenType: string | undefined;
  error: string | undefined;
  state: string | undefined;
};

const parseAuthResponse = ({
  fragment,
  query,
}: TAuthResponse): TResponseData => {
  let returnData: TResponseData = {
    accessToken: undefined,
    expiresIn: undefined,
    tokenType: undefined,
    error: undefined,
    state: undefined,
  };

  if (fragment) {
    const fragmentSearch = new URLSearchParams(fragment);
    returnData = {
      ...returnData,
      accessToken: fragmentSearch.get("access_token") || undefined,
      expiresIn:
        parseInt(fragmentSearch.get("expires_in") || "", 10) || undefined,
      tokenType: fragmentSearch.get("token_type") || undefined,
      state: fragmentSearch.get("state") || undefined,
    };
  }

  if (query) {
    const querySearch = new URLSearchParams(query);
    returnData = {
      ...returnData,
      error: querySearch.get("error") || undefined,
      state: querySearch.get("state") || undefined,
    };
  }

  return returnData;
};

type TWindow = {
  open: (url: string, target: string, features: string) => object | null;
  checkState?: string;
  next?: any;
};

type TOpenLoginParams = {
  windowObj?: TWindow;
  redirectURI: string;
  scopes: string;
  clientID: string;
  checkState?: string;
};
const openLoginPopup = ({
  windowObj = window,
  redirectURI,
  scopes,
  clientID,
  checkState = validationString(),
}: TOpenLoginParams): [window: any, state: string] => {
  const { url, state } = authURL({
    redirectURI: redirectURI,
    scopes: scopes,
    clientID: clientID,
    checkString: checkState,
  });
  const popupWindow = windowObj.open(
    url,
    "Login with Spotify",
    "width=600, height=800"
  );

  return [popupWindow, state];
};

type THandleCallbackParams = {
  fragment: string;
  query: string;
  state?: string;
  successFn?: (authResponse: TResponseData) => any;
  errorFn?: (authResponse: TResponseData) => any;
};
const handleCallback = ({
  fragment,
  query,
  state,
  successFn = (data) => data,
  errorFn = (data) => data,
}: THandleCallbackParams) => {
  const authResponse = parseAuthResponse({
    fragment: fragment,
    query: query,
  });

  if (authResponse.state !== state) {
    authResponse.error = "State mismatch";
    return errorFn(authResponse);
  }
  if (authResponse.error) {
    return errorFn(authResponse);
  }
  return successFn(authResponse);
};

export { authURL, openLoginPopup, handleCallback };
export type { TResponseData, TOpenLoginParams, THandleCallbackParams };

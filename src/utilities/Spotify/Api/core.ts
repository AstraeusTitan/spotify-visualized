import Api from ".";

Api.prototype._buildQuery = function (params?: any): string {
  if (params === undefined) {
    return "";
  }
  const strings = Object.keys(params).map((key) => {
    if (params[key] === undefined) {
      return;
    }

    return `${encodeURIComponent(key)}=${encodeURIComponent(
      params[key] as any
    )}`;
  });

  const nonEmptyStrings = strings.filter(Boolean);
  if (nonEmptyStrings.length === 0) {
    return "";
  }
  return `?${nonEmptyStrings.join("&")}`;
};

Api.prototype._hasScopes = function (scopes: string[]): boolean {
  const checks = scopes.map((scope) => this.config.scopes?.includes(scope));
  return !checks.includes(false);
};

Api.prototype._makeRequest = function (
  route: string,
  requiredScopes?: string[] | null | undefined,
  params?: any
) {
  if (this.config.fetch === undefined) {
    throw new Error("No fetch is defined");
  }

  if (requiredScopes && !this._hasScopes(requiredScopes)) {
    throw new Error(`Token missing scope`);
  }

  const headers = {
    Authorization: `Bearer ${this.config.token?.accessToken}`,
    "Content-Type": "application/json",
  };
  const query = this._buildQuery(params);
  const url = `${this.baseUrl}${route}${params ? query : ""}`;
  return this.config
    .fetch(url, { headers })
    .then((response) => response.json());
};

Api.prototype._requestAllPages = function (
  route: string,
  requiredScopes?: string[] | null | undefined,
  params?: any
):Promise<any> {
  return new Promise(async (resolve, reject) => {
    const pagedParams = { ...params };
    let page,
      items = <any>[];

    do {
      // TODO: add error handling
      page = await this._makeRequest(route, requiredScopes, pagedParams);
      items = items.concat(page.items);
      pagedParams.offset = page.offset + page.limit;
    } while (page?.next);

    page.items = items
    resolve(page)
  });
};

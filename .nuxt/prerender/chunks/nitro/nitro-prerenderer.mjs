globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/node-fetch-native/dist/polyfill.mjs';
import { defineEventHandler, handleCacheHeaders, isEvent, createEvent, getRequestHeader, splitCookiesString, eventHandler, setHeaders, sendRedirect, proxyRequest, setResponseStatus, setResponseHeader, send, getRequestHeaders, removeResponseHeader, createError, getResponseHeader, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/h3/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/ofetch/dist/node.mjs';
import destr from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/destr/dist/index.mjs';
import { createCall, createFetch } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/hookable/dist/index.mjs';
import { snakeCase } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/scule/dist/index.mjs';
import { klona } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/defu/dist/defu.mjs';
import { hash } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/ohash/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47memory from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/unstorage/drivers/memory.mjs';
import unstorage_47drivers_47lru_45cache from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/unstorage/drivers/lru-cache.mjs';
import unstorage_47drivers_47fs_45lite from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/unstorage/drivers/fs-lite.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/radix3/dist/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file:///Users/marquis.abah/gigs/National%20Profile%20Admin%20Dashboard%20Project/node_modules/pathe/dist/index.mjs';

const inlineAppConfig = {};



const appConfig = defuFn(inlineAppConfig);

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": ""
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {}
};
const ENV_PREFIX = "NITRO_";
const ENV_PREFIX_ALT = _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_";
const _sharedRuntimeConfig = _deepFreeze(
  _applyEnv(klona(_inlineRuntimeConfig))
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  _applyEnv(runtimeConfig);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _getEnv(key) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[ENV_PREFIX + envKey] ?? process.env[ENV_PREFIX_ALT + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function _applyEnv(obj, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = _getEnv(subKey);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
      }
      _applyEnv(obj[key], subKey);
    } else {
      obj[key] = envValue ?? obj[key];
    }
  }
  return obj;
}
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return void 0;
  }
});

const serverAssets = [{"baseName":"server","dir":"/Users/marquis.abah/gigs/National Profile Admin Dashboard Project/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('internal:nuxt:prerender', unstorage_47drivers_47memory({"driver":"memory"}));
storage.mount('internal:nuxt:prerender:island', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('internal:nuxt:prerender:payload', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/marquis.abah/gigs/National Profile Admin Dashboard Project/.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/marquis.abah/gigs/National Profile Admin Dashboard Project","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/marquis.abah/gigs/National Profile Admin Dashboard Project/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/marquis.abah/gigs/National Profile Admin Dashboard Project/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/marquis.abah/gigs/National Profile Admin Dashboard Project/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

const defaultCacheOptions = {
  name: "_",
  base: "/cache",
  swr: true,
  maxAge: 1
};
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions, ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = hash([opts.integrity, fn, opts]);
  const validate = opts.validate || (() => true);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    const entry = await useStorage().getItem(cacheKey) || {};
    const ttl = (opts.maxAge ?? opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || !validate(entry);
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== void 0 && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = void 0;
          entry.integrity = void 0;
          entry.mtime = void 0;
          entry.expires = void 0;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry)) {
          const promise = useStorage().setItem(cacheKey, entry).catch((error) => {
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event && event.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && entry.value) {
      _resolvePromise.catch((error) => {
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : void 0
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
const cachedFunction = defineCachedFunction;
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      const _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === void 0) {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: [opts.integrity, handler]
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        variableHeaders[header] = incomingEvent.node.req.headers[header];
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            for (const header in headers2) {
              this.setHeader(header, headers2[header]);
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.context = incomingEvent.context;
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = headers.Etag || headers.etag || `W/"${hash(body)}"`;
      headers["last-modified"] = headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString();
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(event);
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      event.node.res.setHeader(name, response.headers[name]);
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      return sendRedirect(
        event,
        routeRules.redirect.to,
        routeRules.redirect.statusCode
      );
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

const plugins = [
  
];

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, errorObject.message + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const isErrorPage = event.path.startsWith("/__nuxt_error");
  const res = !isErrorPage ? await useNitroApp().localFetch(withQuery(joinURL(useRuntimeConfig().app.baseURL, "/__nuxt_error"), errorObject), {
    headers: getRequestHeaders(event),
    redirect: "manual"
  }).catch(() => null) : null;
  if (!res) {
    const { template } = await import('../error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : void 0, res.statusText);
  return send(event, html);
});

const assets = {
  "/_redirects": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"12-GYFUR20kqoZbjqZ/p+Wm4vWBkkQ\"",
    "mtime": "2024-04-25T23:10:01.547Z",
    "size": 18,
    "path": "../../.output/public/_redirects"
  },
  "/_nuxt/BaseModal.c2106c97.js": {
    "type": "application/javascript",
    "etag": "\"4ae-nq/ej7JOPaoTszcogYLsxlisO74\"",
    "mtime": "2024-04-25T23:10:01.530Z",
    "size": 1198,
    "path": "../../.output/public/_nuxt/BaseModal.c2106c97.js"
  },
  "/_nuxt/BaseModal.e5b86472.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"45-kX5wdB7sxiKkcF/XOW+8mdr7ikg\"",
    "mtime": "2024-04-25T23:10:01.519Z",
    "size": 69,
    "path": "../../.output/public/_nuxt/BaseModal.e5b86472.css"
  },
  "/_nuxt/EmptyState.vue.2686ac38.js": {
    "type": "application/javascript",
    "etag": "\"2f2-m/6dT1AW1ie2fANbzPgvPWdP5i8\"",
    "mtime": "2024-04-25T23:10:01.533Z",
    "size": 754,
    "path": "../../.output/public/_nuxt/EmptyState.vue.2686ac38.js"
  },
  "/_nuxt/_id_.69b221c5.js": {
    "type": "application/javascript",
    "etag": "\"d45-6zCOUIkiznlmyreYMAQrR8r9kF0\"",
    "mtime": "2024-04-25T23:10:01.520Z",
    "size": 3397,
    "path": "../../.output/public/_nuxt/_id_.69b221c5.js"
  },
  "/_nuxt/_id_.d04759eb.js": {
    "type": "application/javascript",
    "etag": "\"3902-M2FfS+tGTtujPUyjKxawm/uDb9Q\"",
    "mtime": "2024-04-25T23:10:01.533Z",
    "size": 14594,
    "path": "../../.output/public/_nuxt/_id_.d04759eb.js"
  },
  "/_nuxt/_id_.fba2e36c.js": {
    "type": "application/javascript",
    "etag": "\"2a61-JU+k5Mu75cme8QsE2JCx1LDsZfs\"",
    "mtime": "2024-04-25T23:10:01.520Z",
    "size": 10849,
    "path": "../../.output/public/_nuxt/_id_.fba2e36c.js"
  },
  "/_nuxt/add-team-member.ae2b761b.js": {
    "type": "application/javascript",
    "etag": "\"853-QDZBFN9yRFmRVNlOgRuj1zqIUlU\"",
    "mtime": "2024-04-25T23:10:01.521Z",
    "size": 2131,
    "path": "../../.output/public/_nuxt/add-team-member.ae2b761b.js"
  },
  "/_nuxt/auth.c984d6ed.js": {
    "type": "application/javascript",
    "etag": "\"53-ECGILINivxH4yB1nqEAe6YkSSL4\"",
    "mtime": "2024-04-25T23:10:01.520Z",
    "size": 83,
    "path": "../../.output/public/_nuxt/auth.c984d6ed.js"
  },
  "/_nuxt/auth.f70e99d1.js": {
    "type": "application/javascript",
    "etag": "\"cc-5964WPac9gL7UTn0OPIHFi+eqA0\"",
    "mtime": "2024-04-25T23:10:01.521Z",
    "size": 204,
    "path": "../../.output/public/_nuxt/auth.f70e99d1.js"
  },
  "/_nuxt/authentication.4ec166e2.js": {
    "type": "application/javascript",
    "etag": "\"462-6zm6EHn27sbJWVmZsuLiYMvCrA4\"",
    "mtime": "2024-04-25T23:10:01.522Z",
    "size": 1122,
    "path": "../../.output/public/_nuxt/authentication.4ec166e2.js"
  },
  "/_nuxt/axios.config.3b7d29d9.js": {
    "type": "application/javascript",
    "etag": "\"7628-NcuGp635bS82rSwhZ2S+HZEWwXU\"",
    "mtime": "2024-04-25T23:10:01.521Z",
    "size": 30248,
    "path": "../../.output/public/_nuxt/axios.config.3b7d29d9.js"
  },
  "/_nuxt/create.f3a0f363.js": {
    "type": "application/javascript",
    "etag": "\"1226-9+PuoWJRHXKKkMi8x0jzxRMaaTU\"",
    "mtime": "2024-04-25T23:10:01.522Z",
    "size": 4646,
    "path": "../../.output/public/_nuxt/create.f3a0f363.js"
  },
  "/_nuxt/dashboard.319994b5.js": {
    "type": "application/javascript",
    "etag": "\"3b0b-9LZRU7E0z7YFnj8GUbinxoWoNdg\"",
    "mtime": "2024-04-25T23:10:01.522Z",
    "size": 15115,
    "path": "../../.output/public/_nuxt/dashboard.319994b5.js"
  },
  "/_nuxt/dashboard.3ef76f94.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b7-zgBnEBuujt7wLH1qb3QvI30i3NI\"",
    "mtime": "2024-04-25T23:10:01.522Z",
    "size": 183,
    "path": "../../.output/public/_nuxt/dashboard.3ef76f94.css"
  },
  "/_nuxt/default.843443c4.js": {
    "type": "application/javascript",
    "etag": "\"bc-cl4vtXSP1KmyO6811j65FC4zLdw\"",
    "mtime": "2024-04-25T23:10:01.522Z",
    "size": 188,
    "path": "../../.output/public/_nuxt/default.843443c4.js"
  },
  "/_nuxt/documents.5a94c6c6.js": {
    "type": "application/javascript",
    "etag": "\"1af-Orz17ozQx0yWSJuzTFPvvxlBvN8\"",
    "mtime": "2024-04-25T23:10:01.522Z",
    "size": 431,
    "path": "../../.output/public/_nuxt/documents.5a94c6c6.js"
  },
  "/_nuxt/entry.0551859d.js": {
    "type": "application/javascript",
    "etag": "\"2a609-iyV3P3d1B6exHYYxxtRryfRhrBQ\"",
    "mtime": "2024-04-25T23:10:01.527Z",
    "size": 173577,
    "path": "../../.output/public/_nuxt/entry.0551859d.js"
  },
  "/_nuxt/entry.ba1e55c1.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"a387-4VQkogvvLsY7E8Uj06BuiZhYnCc\"",
    "mtime": "2024-04-25T23:10:01.524Z",
    "size": 41863,
    "path": "../../.output/public/_nuxt/entry.ba1e55c1.css"
  },
  "/_nuxt/error-404.2e34c358.js": {
    "type": "application/javascript",
    "etag": "\"8f5-io9CndDzgeA+guMkHvBTeo50ZQ8\"",
    "mtime": "2024-04-25T23:10:01.525Z",
    "size": 2293,
    "path": "../../.output/public/_nuxt/error-404.2e34c358.js"
  },
  "/_nuxt/error-404.95c28eb4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-L8dF9pJCW0qi7de8Az4GyBoTHvI\"",
    "mtime": "2024-04-25T23:10:01.525Z",
    "size": 3696,
    "path": "../../.output/public/_nuxt/error-404.95c28eb4.css"
  },
  "/_nuxt/error-500.6d47386c.js": {
    "type": "application/javascript",
    "etag": "\"77e-CnW0Xk+GdYWQNmuAPYAROULfGyc\"",
    "mtime": "2024-04-25T23:10:01.525Z",
    "size": 1918,
    "path": "../../.output/public/_nuxt/error-500.6d47386c.js"
  },
  "/_nuxt/error-500.e798523c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-QP983DB9m1oiDr87r1V1AYEhrfo\"",
    "mtime": "2024-04-25T23:10:01.525Z",
    "size": 2016,
    "path": "../../.output/public/_nuxt/error-500.e798523c.css"
  },
  "/_nuxt/fetchWorkflows.bd81fc81.js": {
    "type": "application/javascript",
    "etag": "\"1a2-KrgaT2VeXmLrL3Vs4sPyf2bfIOs\"",
    "mtime": "2024-04-25T23:10:01.526Z",
    "size": 418,
    "path": "../../.output/public/_nuxt/fetchWorkflows.bd81fc81.js"
  },
  "/_nuxt/getDocumentByWorkflow.cb14a6cb.js": {
    "type": "application/javascript",
    "etag": "\"1c8-rWDy5PJJbO8xFFJ+SKX6E73tDBo\"",
    "mtime": "2024-04-25T23:10:01.526Z",
    "size": 456,
    "path": "../../.output/public/_nuxt/getDocumentByWorkflow.cb14a6cb.js"
  },
  "/_nuxt/index.390bbd49.js": {
    "type": "application/javascript",
    "etag": "\"4c9a-e7OqZ3z1juv1YP9fSCTLRqNFwYo\"",
    "mtime": "2024-04-25T23:10:01.526Z",
    "size": 19610,
    "path": "../../.output/public/_nuxt/index.390bbd49.js"
  },
  "/_nuxt/index.9ed2add0.js": {
    "type": "application/javascript",
    "etag": "\"127-2+PgH5VuDTjX4KVbOnDXiCUeCoY\"",
    "mtime": "2024-04-25T23:10:01.526Z",
    "size": 295,
    "path": "../../.output/public/_nuxt/index.9ed2add0.js"
  },
  "/_nuxt/index.b083903f.js": {
    "type": "application/javascript",
    "etag": "\"19b0-NF1JL6A8a9ksBNVniLc6B0ocVAQ\"",
    "mtime": "2024-04-25T23:10:01.528Z",
    "size": 6576,
    "path": "../../.output/public/_nuxt/index.b083903f.js"
  },
  "/_nuxt/index.cfecb10d.js": {
    "type": "application/javascript",
    "etag": "\"18f9-oOJxci1UMXE4BYPMoLJIsvhjKx4\"",
    "mtime": "2024-04-25T23:10:01.527Z",
    "size": 6393,
    "path": "../../.output/public/_nuxt/index.cfecb10d.js"
  },
  "/_nuxt/index.dd84b4c1.js": {
    "type": "application/javascript",
    "etag": "\"9c-Fp+awrrugp1Ojm5LXFwa8OaI4V0\"",
    "mtime": "2024-04-25T23:10:01.528Z",
    "size": 156,
    "path": "../../.output/public/_nuxt/index.dd84b4c1.js"
  },
  "/_nuxt/list.1d01b97e.js": {
    "type": "application/javascript",
    "etag": "\"df6-jHl2DSeh9wKdxae+aQANQArxvHY\"",
    "mtime": "2024-04-25T23:10:01.527Z",
    "size": 3574,
    "path": "../../.output/public/_nuxt/list.1d01b97e.js"
  },
  "/_nuxt/login.9c5c027d.js": {
    "type": "application/javascript",
    "etag": "\"142c3-/Ptmm3XIyZc3PGboj3Lt2w6K+xo\"",
    "mtime": "2024-04-25T23:10:01.529Z",
    "size": 82627,
    "path": "../../.output/public/_nuxt/login.9c5c027d.js"
  },
  "/_nuxt/login.c4dbd417.js": {
    "type": "application/javascript",
    "etag": "\"80e-ht7QOu7oCxSfpDgxNsS/r0fxFbY\"",
    "mtime": "2024-04-25T23:10:01.528Z",
    "size": 2062,
    "path": "../../.output/public/_nuxt/login.c4dbd417.js"
  },
  "/_nuxt/logo.2adbadf7.png": {
    "type": "image/png",
    "etag": "\"16e4-2m7bYjm8eTB8SDbhUxbrrsyrS/U\"",
    "mtime": "2024-04-25T23:10:01.529Z",
    "size": 5860,
    "path": "../../.output/public/_nuxt/logo.2adbadf7.png"
  },
  "/_nuxt/logo.d0d645d7.js": {
    "type": "application/javascript",
    "etag": "\"69-/5HPs+SFFmWH/StxQpNs1ku1BfE\"",
    "mtime": "2024-04-25T23:10:01.529Z",
    "size": 105,
    "path": "../../.output/public/_nuxt/logo.d0d645d7.js"
  },
  "/_nuxt/members.88f7b391.js": {
    "type": "application/javascript",
    "etag": "\"2320-GDiyTXL3iO9bwgNLvXi2/mFrHoQ\"",
    "mtime": "2024-04-25T23:10:01.529Z",
    "size": 8992,
    "path": "../../.output/public/_nuxt/members.88f7b391.js"
  },
  "/_nuxt/nuxt-link.e3b02539.js": {
    "type": "application/javascript",
    "etag": "\"10fc-tmvg8dcVOOq1JQjqGvDNTb3yWO4\"",
    "mtime": "2024-04-25T23:10:01.530Z",
    "size": 4348,
    "path": "../../.output/public/_nuxt/nuxt-link.e3b02539.js"
  },
  "/_nuxt/option.7cee7384.js": {
    "type": "application/javascript",
    "etag": "\"308-o+NRJQJ/cbl4u5ZnzUcJuA1+0hw\"",
    "mtime": "2024-04-25T23:10:01.530Z",
    "size": 776,
    "path": "../../.output/public/_nuxt/option.7cee7384.js"
  },
  "/_nuxt/organization.10374e31.svg": {
    "type": "image/svg+xml",
    "etag": "\"11a-cvcvhGjTK1qpQfm0nsU098HAFqo\"",
    "mtime": "2024-04-25T23:10:01.534Z",
    "size": 282,
    "path": "../../.output/public/_nuxt/organization.10374e31.svg"
  },
  "/_nuxt/organization.74194ff8.js": {
    "type": "application/javascript",
    "etag": "\"21d-JB6jXIDUEJ0RKL77ikTqZYWGxR8\"",
    "mtime": "2024-04-25T23:10:01.531Z",
    "size": 541,
    "path": "../../.output/public/_nuxt/organization.74194ff8.js"
  },
  "/_nuxt/signup.be520b58.js": {
    "type": "application/javascript",
    "etag": "\"e6c-NVqhdjY2HWeepQLEQ2tEwacTj0g\"",
    "mtime": "2024-04-25T23:10:01.533Z",
    "size": 3692,
    "path": "../../.output/public/_nuxt/signup.be520b58.js"
  },
  "/_nuxt/slideover.fbb3e185.js": {
    "type": "application/javascript",
    "etag": "\"7f7-KdISEMkXqyTK62MCn+/OTtkQ3VU\"",
    "mtime": "2024-04-25T23:10:01.532Z",
    "size": 2039,
    "path": "../../.output/public/_nuxt/slideover.fbb3e185.js"
  },
  "/_nuxt/test.8fcbfc80.js": {
    "type": "application/javascript",
    "etag": "\"f5-sN2QZM0YbMrfyHwyGURsNKwLR0I\"",
    "mtime": "2024-04-25T23:10:01.532Z",
    "size": 245,
    "path": "../../.output/public/_nuxt/test.8fcbfc80.js"
  },
  "/_nuxt/useConfirmationModal.319cb222.js": {
    "type": "application/javascript",
    "etag": "\"2cc-4e0pXG0ziXuUuAikHjIrqZO7JZA\"",
    "mtime": "2024-04-25T23:10:01.533Z",
    "size": 716,
    "path": "../../.output/public/_nuxt/useConfirmationModal.319cb222.js"
  },
  "/_nuxt/vue.f36acd1f.66a9a2aa.js": {
    "type": "application/javascript",
    "etag": "\"181-8OKHg+Sfqgg77QQXAw2DvDkJnxE\"",
    "mtime": "2024-04-25T23:10:01.533Z",
    "size": 385,
    "path": "../../.output/public/_nuxt/vue.f36acd1f.66a9a2aa.js"
  },
  "/_nuxt/workflow.161c0e99.svg": {
    "type": "image/svg+xml",
    "etag": "\"23e-/wjaHsmFOS019HZj3pid/l98ZMw\"",
    "mtime": "2024-04-25T23:10:01.534Z",
    "size": 574,
    "path": "../../.output/public/_nuxt/workflow.161c0e99.svg"
  },
  "/_nuxt/workflow.8067b181.js": {
    "type": "application/javascript",
    "etag": "\"27b-CY03YVXnV53hWr7WtDbMlSju6iw\"",
    "mtime": "2024-04-25T23:10:01.534Z",
    "size": 635,
    "path": "../../.output/public/_nuxt/workflow.8067b181.js"
  }
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets[id].path))
}

const publicAssetBases = {"/_nuxt":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _f4b49z = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    setResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _lazy_IJLb5O = () => import('../renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_IJLb5O, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((_err) => {
      console.error("Error while capturing another error", _err);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter$1({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (...args) => {
    return _localFetch(...args).then(
      (response) => normalizeFetchResponse(response)
    );
  };
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  for (const plugin of plugins) {
    try {
      plugin(app);
    } catch (err) {
      captureError(err, { tags: ["plugin"] });
      throw err;
    }
  }
  return app;
}
const nitroApp = createNitroApp();
const useNitroApp = () => nitroApp;

const localFetch = nitroApp.localFetch;
trapUnhandledNodeErrors();

export { useRuntimeConfig as a, useStorage as b, getRouteRules as g, localFetch as l, useNitroApp as u };
//# sourceMappingURL=nitro-prerenderer.mjs.map

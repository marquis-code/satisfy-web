globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/node-fetch-native/dist/polyfill.mjs';
import { defineEventHandler, handleCacheHeaders, isEvent, createEvent, getRequestHeader, splitCookiesString, eventHandler, setHeaders, sendRedirect, proxyRequest, setResponseStatus, setResponseHeader, send, getRequestHeaders, removeResponseHeader, createError, getResponseHeader, createApp, createRouter as createRouter$1, toNodeListener, fetchWithEvent, lazyEventHandler } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/h3/dist/index.mjs';
import { createFetch as createFetch$1, Headers as Headers$1 } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/ofetch/dist/node.mjs';
import destr from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/destr/dist/index.mjs';
import { createCall, createFetch } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/unenv/runtime/fetch/index.mjs';
import { createHooks } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/hookable/dist/index.mjs';
import { snakeCase } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/scule/dist/index.mjs';
import { klona } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/klona/dist/index.mjs';
import defu, { defuFn } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/defu/dist/defu.mjs';
import { hash } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/ohash/dist/index.mjs';
import { parseURL, withoutBase, joinURL, getQuery, withQuery, decodePath, withLeadingSlash, withoutTrailingSlash } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/ufo/dist/index.mjs';
import { createStorage, prefixStorage } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/unstorage/dist/index.mjs';
import unstorage_47drivers_47fs from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/unstorage/drivers/fs.mjs';
import unstorage_47drivers_47memory from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/unstorage/drivers/memory.mjs';
import unstorage_47drivers_47lru_45cache from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/unstorage/drivers/lru-cache.mjs';
import unstorage_47drivers_47fs_45lite from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/unstorage/drivers/fs-lite.mjs';
import { toRouteMatcher, createRouter } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/radix3/dist/index.mjs';
import { promises } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'file:///Users/marquis.abah/gigs/homepod_admin/node_modules/pathe/dist/index.mjs';

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

const serverAssets = [{"baseName":"server","dir":"/Users/marquis.abah/gigs/homepod_admin/server/assets"}];

const assets$1 = createStorage();

for (const asset of serverAssets) {
  assets$1.mount(asset.baseName, unstorage_47drivers_47fs({ base: asset.dir }));
}

const storage = createStorage({});

storage.mount('/assets', assets$1);

storage.mount('internal:nuxt:prerender', unstorage_47drivers_47memory({"driver":"memory"}));
storage.mount('internal:nuxt:prerender:island', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('internal:nuxt:prerender:payload', unstorage_47drivers_47lru_45cache({"driver":"lruCache","max":1000}));
storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/marquis.abah/gigs/homepod_admin/.data/kv"}));
storage.mount('root', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/marquis.abah/gigs/homepod_admin","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('src', unstorage_47drivers_47fs({"driver":"fs","readOnly":true,"base":"/Users/marquis.abah/gigs/homepod_admin/server","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('build', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/marquis.abah/gigs/homepod_admin/.nuxt","ignore":["**/node_modules/**","**/.git/**"]}));
storage.mount('cache', unstorage_47drivers_47fs({"driver":"fs","readOnly":false,"base":"/Users/marquis.abah/gigs/homepod_admin/.nuxt/cache","ignore":["**/node_modules/**","**/.git/**"]}));

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
    "mtime": "2024-05-03T10:54:58.890Z",
    "size": 18,
    "path": "../../.output/public/_redirects"
  },
  "/_nuxt/_id.570b63ec.js": {
    "type": "application/javascript",
    "etag": "\"3818-ttzgR13aqOGTGMMCzQhOAhGde6o\"",
    "mtime": "2024-05-03T10:54:58.878Z",
    "size": 14360,
    "path": "../../.output/public/_nuxt/_id.570b63ec.js"
  },
  "/_nuxt/_id.ae467b44.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"ab-A5Upq4AUky1cgoBefl/zoeiGTp4\"",
    "mtime": "2024-05-03T10:54:58.879Z",
    "size": 171,
    "path": "../../.output/public/_nuxt/_id.ae467b44.css"
  },
  "/_nuxt/active-eclipse.ca385419.svg": {
    "type": "image/svg+xml",
    "etag": "\"11d-1DIHrLmPIMN0MfZGPUb9iGKMq1w\"",
    "mtime": "2024-05-03T10:54:58.879Z",
    "size": 285,
    "path": "../../.output/public/_nuxt/active-eclipse.ca385419.svg"
  },
  "/_nuxt/animated-login.8a85e78b.svg": {
    "type": "image/svg+xml",
    "etag": "\"2956f-hWsuFrUOx3Vbzo0FWLf0qKDUPkU\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 169327,
    "path": "../../.output/public/_nuxt/animated-login.8a85e78b.svg"
  },
  "/_nuxt/arrow-left.7d700ce7.svg": {
    "type": "image/svg+xml",
    "etag": "\"11b-ebDf4Q6I574M/6Iumsz+5/+Wv4w\"",
    "mtime": "2024-05-03T10:54:58.879Z",
    "size": 283,
    "path": "../../.output/public/_nuxt/arrow-left.7d700ce7.svg"
  },
  "/_nuxt/arrow-right-white.22501064.svg": {
    "type": "image/svg+xml",
    "etag": "\"382-OvPNKh6dyu4ZeTYdUzUu6aIUeK0\"",
    "mtime": "2024-05-03T10:54:58.879Z",
    "size": 898,
    "path": "../../.output/public/_nuxt/arrow-right-white.22501064.svg"
  },
  "/_nuxt/arrow-right.474b3959.svg": {
    "type": "image/svg+xml",
    "etag": "\"120-2ZYvziyiPYtmSE1Mnikc4xAMFtg\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 288,
    "path": "../../.output/public/_nuxt/arrow-right.474b3959.svg"
  },
  "/_nuxt/arrow-right.4759cbaa.js": {
    "type": "application/javascript",
    "etag": "\"70-L0id1xBpqWzk3oH4Wm7Pkwh7/8I\"",
    "mtime": "2024-05-03T10:54:58.879Z",
    "size": 112,
    "path": "../../.output/public/_nuxt/arrow-right.4759cbaa.js"
  },
  "/_nuxt/auth.2a2262ab.js": {
    "type": "application/javascript",
    "etag": "\"b9e-1ZdgqmfSUTaaVMIrNHwtOnlqAfM\"",
    "mtime": "2024-05-03T10:54:58.879Z",
    "size": 2974,
    "path": "../../.output/public/_nuxt/auth.2a2262ab.js"
  },
  "/_nuxt/auth.de37f995.js": {
    "type": "application/javascript",
    "etag": "\"53-Y73lI3P9yFj5KUm98rDkdcGVZQk\"",
    "mtime": "2024-05-03T10:54:58.879Z",
    "size": 83,
    "path": "../../.output/public/_nuxt/auth.de37f995.js"
  },
  "/_nuxt/authentication.4a8202bf.js": {
    "type": "application/javascript",
    "etag": "\"c6-5I4pq0o9vfCcEx/pyeHE6BI/HLg\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 198,
    "path": "../../.output/public/_nuxt/authentication.4a8202bf.js"
  },
  "/_nuxt/axios.config.db4b6de5.js": {
    "type": "application/javascript",
    "etag": "\"762d-uusSFt+JNHajkKIQ1/mZ0iZTDu8\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 30253,
    "path": "../../.output/public/_nuxt/axios.config.db4b6de5.js"
  },
  "/_nuxt/camera.3c2176a4.svg": {
    "type": "image/svg+xml",
    "etag": "\"515-UTxRRsjriSzT8b4/WNcg4F5iHcM\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 1301,
    "path": "../../.output/public/_nuxt/camera.3c2176a4.svg"
  },
  "/_nuxt/danger.f4156b09.svg": {
    "type": "image/svg+xml",
    "etag": "\"1e8-mjKaZzz79g6BoWvjR9TLSxPrx9E\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 488,
    "path": "../../.output/public/_nuxt/danger.f4156b09.svg"
  },
  "/_nuxt/dashboard.3200bb7a.js": {
    "type": "application/javascript",
    "etag": "\"809b-kDL5/U5eQR5YNUchYbKJGYhwvuI\"",
    "mtime": "2024-05-03T10:54:58.881Z",
    "size": 32923,
    "path": "../../.output/public/_nuxt/dashboard.3200bb7a.js"
  },
  "/_nuxt/dashboard.69eb9ffa.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"50-l04Tie5X7Ki9LQwS6muqsbryIQY\"",
    "mtime": "2024-05-03T10:54:58.881Z",
    "size": 80,
    "path": "../../.output/public/_nuxt/dashboard.69eb9ffa.css"
  },
  "/_nuxt/decrease.4196d376.svg": {
    "type": "image/svg+xml",
    "etag": "\"356-+Js3duYj3eJI6CZ2INaaSs+z7Q0\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 854,
    "path": "../../.output/public/_nuxt/decrease.4196d376.svg"
  },
  "/_nuxt/default.0ec416d4.js": {
    "type": "application/javascript",
    "etag": "\"bc-hi0jUQ/G4/ry8kQ2axDRs8UblPA\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 188,
    "path": "../../.output/public/_nuxt/default.0ec416d4.js"
  },
  "/_nuxt/eclipse.41d4833a.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"5f-SXbktz3ZjWZZOiaAdTBTQp6lhZA\"",
    "mtime": "2024-05-03T10:54:58.880Z",
    "size": 95,
    "path": "../../.output/public/_nuxt/eclipse.41d4833a.css"
  },
  "/_nuxt/eclipse.4a1883bc.svg": {
    "type": "image/svg+xml",
    "etag": "\"9a-VWK3f0Q6snvuGxM6c5V6WQvb71k\"",
    "mtime": "2024-05-03T10:54:58.881Z",
    "size": 154,
    "path": "../../.output/public/_nuxt/eclipse.4a1883bc.svg"
  },
  "/_nuxt/eclipse.a55fe39c.js": {
    "type": "application/javascript",
    "etag": "\"1a63-WMfIb6c1dsLbxCPqbcmuq4X/row\"",
    "mtime": "2024-05-03T10:54:58.881Z",
    "size": 6755,
    "path": "../../.output/public/_nuxt/eclipse.a55fe39c.js"
  },
  "/_nuxt/email.2eea43f8.svg": {
    "type": "image/svg+xml",
    "etag": "\"50f-yn4xZ9OENdNKXnsE9jxZIzKeMxM\"",
    "mtime": "2024-05-03T10:54:58.881Z",
    "size": 1295,
    "path": "../../.output/public/_nuxt/email.2eea43f8.svg"
  },
  "/_nuxt/entry.d6bcec4f.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"c954-ptkNlAbEoBjpaQaubaNcb2iRfx4\"",
    "mtime": "2024-05-03T10:54:58.881Z",
    "size": 51540,
    "path": "../../.output/public/_nuxt/entry.d6bcec4f.css"
  },
  "/_nuxt/entry.dcee10dc.js": {
    "type": "application/javascript",
    "etag": "\"aa3a2-Tq/vrQSqcsxI/K+9UJFOdUpvHEQ\"",
    "mtime": "2024-05-03T10:54:58.885Z",
    "size": 697250,
    "path": "../../.output/public/_nuxt/entry.dcee10dc.js"
  },
  "/_nuxt/error-404.2b417a01.js": {
    "type": "application/javascript",
    "etag": "\"8f5-wbhOtTaycx0HZ2/zI4fWzoLIJNQ\"",
    "mtime": "2024-05-03T10:54:58.881Z",
    "size": 2293,
    "path": "../../.output/public/_nuxt/error-404.2b417a01.js"
  },
  "/_nuxt/error-404.95c28eb4.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"e70-L8dF9pJCW0qi7de8Az4GyBoTHvI\"",
    "mtime": "2024-05-03T10:54:58.882Z",
    "size": 3696,
    "path": "../../.output/public/_nuxt/error-404.95c28eb4.css"
  },
  "/_nuxt/error-500.ae41332d.js": {
    "type": "application/javascript",
    "etag": "\"77e-EViWGWdSoTTQiD9f+C8PdidPXS8\"",
    "mtime": "2024-05-03T10:54:58.882Z",
    "size": 1918,
    "path": "../../.output/public/_nuxt/error-500.ae41332d.js"
  },
  "/_nuxt/error-500.e798523c.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7e0-QP983DB9m1oiDr87r1V1AYEhrfo\"",
    "mtime": "2024-05-03T10:54:58.882Z",
    "size": 2016,
    "path": "../../.output/public/_nuxt/error-500.e798523c.css"
  },
  "/_nuxt/eye-close.5b70a48a.svg": {
    "type": "image/svg+xml",
    "etag": "\"334-ZzF2dxZ6RH5Q0Xe2c1Egn1Q+rwE\"",
    "mtime": "2024-05-03T10:54:58.882Z",
    "size": 820,
    "path": "../../.output/public/_nuxt/eye-close.5b70a48a.svg"
  },
  "/_nuxt/eye-open.0980a840.svg": {
    "type": "image/svg+xml",
    "etag": "\"11d-ISD5VNQbzxOHfUnSwn3I6Sic8i4\"",
    "mtime": "2024-05-03T10:54:58.882Z",
    "size": 285,
    "path": "../../.output/public/_nuxt/eye-open.0980a840.svg"
  },
  "/_nuxt/eye-open.d192ad10.js": {
    "type": "application/javascript",
    "etag": "\"6d-uznGt2e9bwM95IN+p6v3wBOCI58\"",
    "mtime": "2024-05-03T10:54:58.882Z",
    "size": 109,
    "path": "../../.output/public/_nuxt/eye-open.d192ad10.js"
  },
  "/_nuxt/fetch.442b855a.js": {
    "type": "application/javascript",
    "etag": "\"40f-BTshta1B2ZfUxQHLbBAn1IcMFug\"",
    "mtime": "2024-05-03T10:54:58.883Z",
    "size": 1039,
    "path": "../../.output/public/_nuxt/fetch.442b855a.js"
  },
  "/_nuxt/homepod-black.fad1eb14.svg": {
    "type": "image/svg+xml",
    "etag": "\"8a65-lYJjWwR/omR0FNzib6v04luuP8k\"",
    "mtime": "2024-05-03T10:54:58.883Z",
    "size": 35429,
    "path": "../../.output/public/_nuxt/homepod-black.fad1eb14.svg"
  },
  "/_nuxt/increase.8dea1614.svg": {
    "type": "image/svg+xml",
    "etag": "\"356-KSJweYjf4S/5V5JNXF83HS1Ud34\"",
    "mtime": "2024-05-03T10:54:58.883Z",
    "size": 854,
    "path": "../../.output/public/_nuxt/increase.8dea1614.svg"
  },
  "/_nuxt/index.2e20149f.js": {
    "type": "application/javascript",
    "etag": "\"99-n30qfb791ew/w7pHFXl3ETWrcHk\"",
    "mtime": "2024-05-03T10:54:58.883Z",
    "size": 153,
    "path": "../../.output/public/_nuxt/index.2e20149f.js"
  },
  "/_nuxt/index.3ae7367f.js": {
    "type": "application/javascript",
    "etag": "\"99-n30qfb791ew/w7pHFXl3ETWrcHk\"",
    "mtime": "2024-05-03T10:54:58.883Z",
    "size": 153,
    "path": "../../.output/public/_nuxt/index.3ae7367f.js"
  },
  "/_nuxt/index.470810c0.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"7a-DPMirsoO/RwDMpIOnCQDZgzejq4\"",
    "mtime": "2024-05-03T10:54:58.883Z",
    "size": 122,
    "path": "../../.output/public/_nuxt/index.470810c0.css"
  },
  "/_nuxt/index.7760f885.js": {
    "type": "application/javascript",
    "etag": "\"4e65-k+OaUD1VP0LwiN3IKYJ22foprNE\"",
    "mtime": "2024-05-03T10:54:58.884Z",
    "size": 20069,
    "path": "../../.output/public/_nuxt/index.7760f885.js"
  },
  "/_nuxt/index.9f846756.js": {
    "type": "application/javascript",
    "etag": "\"99-n30qfb791ew/w7pHFXl3ETWrcHk\"",
    "mtime": "2024-05-03T10:54:58.883Z",
    "size": 153,
    "path": "../../.output/public/_nuxt/index.9f846756.js"
  },
  "/_nuxt/index.b8e29b56.js": {
    "type": "application/javascript",
    "etag": "\"99-n30qfb791ew/w7pHFXl3ETWrcHk\"",
    "mtime": "2024-05-03T10:54:58.884Z",
    "size": 153,
    "path": "../../.output/public/_nuxt/index.b8e29b56.js"
  },
  "/_nuxt/index.c16832b0.js": {
    "type": "application/javascript",
    "etag": "\"3167-y3TCxBbdwhVW9iqPsrLradgDH9M\"",
    "mtime": "2024-05-03T10:54:58.884Z",
    "size": 12647,
    "path": "../../.output/public/_nuxt/index.c16832b0.js"
  },
  "/_nuxt/index.fb5a939b.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"45-BMN24wmK5gr8nd6MAYW3qgHzPkg\"",
    "mtime": "2024-05-03T10:54:58.884Z",
    "size": 69,
    "path": "../../.output/public/_nuxt/index.fb5a939b.css"
  },
  "/_nuxt/index.fdc9d3b4.js": {
    "type": "application/javascript",
    "etag": "\"b57-rL0fvqcJZ60bkpShd8VzRWmul3A\"",
    "mtime": "2024-05-03T10:54:58.884Z",
    "size": 2903,
    "path": "../../.output/public/_nuxt/index.fdc9d3b4.js"
  },
  "/_nuxt/ios-badge.29980f6d.svg": {
    "type": "image/svg+xml",
    "etag": "\"f0d-XLvK/ZFnnygBbzUPCjLO95+5EGE\"",
    "mtime": "2024-05-03T10:54:58.884Z",
    "size": 3853,
    "path": "../../.output/public/_nuxt/ios-badge.29980f6d.svg"
  },
  "/_nuxt/login.43c38c1c.js": {
    "type": "application/javascript",
    "etag": "\"1439d-6SMjc37h7pCvAOxjV6RDSbQ77CU\"",
    "mtime": "2024-05-03T10:54:58.885Z",
    "size": 82845,
    "path": "../../.output/public/_nuxt/login.43c38c1c.js"
  },
  "/_nuxt/new.9f924624.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75-VnDDWYskdzYtLLK5s/w6ayTDurQ\"",
    "mtime": "2024-05-03T10:54:58.885Z",
    "size": 117,
    "path": "../../.output/public/_nuxt/new.9f924624.css"
  },
  "/_nuxt/new.aaeea11b.js": {
    "type": "application/javascript",
    "etag": "\"1ec4-3nWqu9B9EyD1pZjtnECzryVJKmA\"",
    "mtime": "2024-05-03T10:54:58.885Z",
    "size": 7876,
    "path": "../../.output/public/_nuxt/new.aaeea11b.js"
  },
  "/_nuxt/nuxt-link.1f889ed9.js": {
    "type": "application/javascript",
    "etag": "\"10fa-3PQitNsNjSIs7ALWvpaj0f8W584\"",
    "mtime": "2024-05-03T10:54:58.885Z",
    "size": 4346,
    "path": "../../.output/public/_nuxt/nuxt-link.1f889ed9.js"
  },
  "/_nuxt/redirect.a057544b.js": {
    "type": "application/javascript",
    "etag": "\"297-VkvQG0wz9s1X2ioIl51hbodjugg\"",
    "mtime": "2024-05-03T10:54:58.885Z",
    "size": 663,
    "path": "../../.output/public/_nuxt/redirect.a057544b.js"
  },
  "/_nuxt/star-group.79424725.svg": {
    "type": "image/svg+xml",
    "etag": "\"454-IzWmxXhvY5zm1jzWeRmWmYLmuV0\"",
    "mtime": "2024-05-03T10:54:58.885Z",
    "size": 1108,
    "path": "../../.output/public/_nuxt/star-group.79424725.svg"
  },
  "/_nuxt/stories-link.84befaa1.svg": {
    "type": "image/svg+xml",
    "etag": "\"327-Fpd2zkC8CchVrow3W5Za/NvfVLg\"",
    "mtime": "2024-05-03T10:54:58.886Z",
    "size": 807,
    "path": "../../.output/public/_nuxt/stories-link.84befaa1.svg"
  },
  "/_nuxt/success.7ed68fb4.svg": {
    "type": "image/svg+xml",
    "etag": "\"30a-06USXVk9MWanDdc/f+/t8qcVWws\"",
    "mtime": "2024-05-03T10:54:58.886Z",
    "size": 778,
    "path": "../../.output/public/_nuxt/success.7ed68fb4.svg"
  },
  "/_nuxt/suspended.b3d746b8.svg": {
    "type": "image/svg+xml",
    "etag": "\"94-/dQrimSuh/JR8v9NHVePz5BV8i0\"",
    "mtime": "2024-05-03T10:54:58.886Z",
    "size": 148,
    "path": "../../.output/public/_nuxt/suspended.b3d746b8.svg"
  },
  "/_nuxt/vue.f36acd1f.8bc17024.js": {
    "type": "application/javascript",
    "etag": "\"181-Sip7BIpwwtAEpbRwFmeMZxkDtVA\"",
    "mtime": "2024-05-03T10:54:58.886Z",
    "size": 385,
    "path": "../../.output/public/_nuxt/vue.f36acd1f.8bc17024.js"
  },
  "/_nuxt/warning.36528d5f.js": {
    "type": "application/javascript",
    "etag": "\"6c-R25tyuJsL02Tz0DiL5V9NmoB9Uc\"",
    "mtime": "2024-05-03T10:54:58.886Z",
    "size": 108,
    "path": "../../.output/public/_nuxt/warning.36528d5f.js"
  },
  "/_nuxt/warning.9633fd11.svg": {
    "type": "image/svg+xml",
    "etag": "\"530-MTVakCO4OVSPaxGrB87HZT4Rfas\"",
    "mtime": "2024-05-03T10:54:58.886Z",
    "size": 1328,
    "path": "../../.output/public/_nuxt/warning.9633fd11.svg"
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

const _lazy_r2kbO4 = () => import('../renderer.mjs');

const handlers = [
  { route: '', handler: _f4b49z, lazy: false, middleware: true, method: undefined },
  { route: '/**', handler: _lazy_r2kbO4, lazy: true, middleware: false, method: undefined }
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

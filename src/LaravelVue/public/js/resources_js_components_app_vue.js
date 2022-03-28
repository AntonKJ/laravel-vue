(self["webpackChunk"] = self["webpackChunk"] || []).push([["resources_js_components_app_vue"],{

/***/ "./node_modules/@babel/runtime/regenerator/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! regenerator-runtime */ "./node_modules/regenerator-runtime/runtime.js");


/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__(/*! ./lib/axios */ "./node_modules/axios/lib/axios.js");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "./node_modules/axios/lib/core/settle.js");
var cookies = __webpack_require__(/*! ./../helpers/cookies */ "./node_modules/axios/lib/helpers/cookies.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var buildFullPath = __webpack_require__(/*! ../core/buildFullPath */ "./node_modules/axios/lib/core/buildFullPath.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "./node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "./node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "./node_modules/axios/lib/core/createError.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;
    var responseType = config.responseType;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password ? unescape(encodeURIComponent(config.auth.password)) : '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    function onloadend() {
      if (!request) {
        return;
      }
      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !responseType || responseType === 'text' ||  responseType === 'json' ?
        request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    }

    if ('onloadend' in request) {
      // Use onloadend if available
      request.onloadend = onloadend;
    } else {
      // Listen for ready state to emulate onloadend
      request.onreadystatechange = function handleLoad() {
        if (!request || request.readyState !== 4) {
          return;
        }

        // The request errored out and we didn't get a response, this will be
        // handled by onerror instead
        // With one exception: request that using file: protocol, most browsers
        // will return status as 0 even though it's a successful request
        if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
          return;
        }
        // readystate handler is calling before onerror or ontimeout handlers,
        // so we should call onloadend on the next 'tick'
        setTimeout(onloadend);
      };
    }

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(
        timeoutErrorMessage,
        config,
        config.transitional && config.transitional.clarifyTimeoutError ? 'ETIMEDOUT' : 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (responseType && responseType !== 'json') {
      request.responseType = config.responseType;
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (!requestData) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "./node_modules/axios/lib/core/Axios.js");
var mergeConfig = __webpack_require__(/*! ./core/mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var defaults = __webpack_require__(/*! ./defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "./node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "./node_modules/axios/lib/helpers/spread.js");

// Expose isAxiosError
axios.isAxiosError = __webpack_require__(/*! ./helpers/isAxiosError */ "./node_modules/axios/lib/helpers/isAxiosError.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports["default"] = axios;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/***/ ((module) => {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "./node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/***/ ((module) => {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var buildURL = __webpack_require__(/*! ../helpers/buildURL */ "./node_modules/axios/lib/helpers/buildURL.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "./node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "./node_modules/axios/lib/core/dispatchRequest.js");
var mergeConfig = __webpack_require__(/*! ./mergeConfig */ "./node_modules/axios/lib/core/mergeConfig.js");
var validator = __webpack_require__(/*! ../helpers/validator */ "./node_modules/axios/lib/helpers/validator.js");

var validators = validator.validators;
/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  var transitional = config.transitional;

  if (transitional !== undefined) {
    validator.assertOptions(transitional, {
      silentJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      forcedJSONParsing: validators.transitional(validators.boolean, '1.0.0'),
      clarifyTimeoutError: validators.transitional(validators.boolean, '1.0.0')
    }, false);
  }

  // filter out skipped interceptors
  var requestInterceptorChain = [];
  var synchronousRequestInterceptors = true;
  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    if (typeof interceptor.runWhen === 'function' && interceptor.runWhen(config) === false) {
      return;
    }

    synchronousRequestInterceptors = synchronousRequestInterceptors && interceptor.synchronous;

    requestInterceptorChain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  var responseInterceptorChain = [];
  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    responseInterceptorChain.push(interceptor.fulfilled, interceptor.rejected);
  });

  var promise;

  if (!synchronousRequestInterceptors) {
    var chain = [dispatchRequest, undefined];

    Array.prototype.unshift.apply(chain, requestInterceptorChain);
    chain = chain.concat(responseInterceptorChain);

    promise = Promise.resolve(config);
    while (chain.length) {
      promise = promise.then(chain.shift(), chain.shift());
    }

    return promise;
  }


  var newConfig = config;
  while (requestInterceptorChain.length) {
    var onFulfilled = requestInterceptorChain.shift();
    var onRejected = requestInterceptorChain.shift();
    try {
      newConfig = onFulfilled(newConfig);
    } catch (error) {
      onRejected(error);
      break;
    }
  }

  try {
    promise = dispatchRequest(newConfig);
  } catch (error) {
    return Promise.reject(error);
  }

  while (responseInterceptorChain.length) {
    promise = promise.then(responseInterceptorChain.shift(), responseInterceptorChain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: (config || {}).data
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(mergeConfig(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected, options) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected,
    synchronous: options ? options.synchronous : false,
    runWhen: options ? options.runWhen : null
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "./node_modules/axios/lib/core/buildFullPath.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/buildFullPath.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isAbsoluteURL = __webpack_require__(/*! ../helpers/isAbsoluteURL */ "./node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ../helpers/combineURLs */ "./node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "./node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "./node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData.call(
    config,
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData.call(
      config,
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData.call(
          config,
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/***/ ((module) => {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function toJSON() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/mergeConfig.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/mergeConfig.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy', 'params'];
  var defaultToConfig2Keys = [
    'baseURL', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'timeoutMessage', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'decompress',
    'maxContentLength', 'maxBodyLength', 'maxRedirects', 'transport', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath', 'responseEncoding'
  ];
  var directMergeKeys = ['validateStatus'];

  function getMergedValue(target, source) {
    if (utils.isPlainObject(target) && utils.isPlainObject(source)) {
      return utils.merge(target, source);
    } else if (utils.isPlainObject(source)) {
      return utils.merge({}, source);
    } else if (utils.isArray(source)) {
      return source.slice();
    }
    return source;
  }

  function mergeDeepProperties(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  }

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, mergeDeepProperties);

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (!utils.isUndefined(config2[prop])) {
      config[prop] = getMergedValue(undefined, config2[prop]);
    } else if (!utils.isUndefined(config1[prop])) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  utils.forEach(directMergeKeys, function merge(prop) {
    if (prop in config2) {
      config[prop] = getMergedValue(config1[prop], config2[prop]);
    } else if (prop in config1) {
      config[prop] = getMergedValue(undefined, config1[prop]);
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys)
    .concat(directMergeKeys);

  var otherKeys = Object
    .keys(config1)
    .concat(Object.keys(config2))
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, mergeDeepProperties);

  return config;
};


/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "./node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");
var defaults = __webpack_require__(/*! ./../defaults */ "./node_modules/axios/lib/defaults.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  var context = this || defaults;
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn.call(context, data, headers);
  });

  return data;
};


/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
/* provided dependency */ var process = __webpack_require__(/*! process/browser.js */ "./node_modules/process/browser.js");


var utils = __webpack_require__(/*! ./utils */ "./node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "./node_modules/axios/lib/helpers/normalizeHeaderName.js");
var enhanceError = __webpack_require__(/*! ./core/enhanceError */ "./node_modules/axios/lib/core/enhanceError.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "./node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "./node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

function stringifySafely(rawValue, parser, encoder) {
  if (utils.isString(rawValue)) {
    try {
      (parser || JSON.parse)(rawValue);
      return utils.trim(rawValue);
    } catch (e) {
      if (e.name !== 'SyntaxError') {
        throw e;
      }
    }
  }

  return (encoder || JSON.stringify)(rawValue);
}

var defaults = {

  transitional: {
    silentJSONParsing: true,
    forcedJSONParsing: true,
    clarifyTimeoutError: false
  },

  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');

    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data) || (headers && headers['Content-Type'] === 'application/json')) {
      setContentTypeIfUnset(headers, 'application/json');
      return stringifySafely(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    var transitional = this.transitional;
    var silentJSONParsing = transitional && transitional.silentJSONParsing;
    var forcedJSONParsing = transitional && transitional.forcedJSONParsing;
    var strictJSONParsing = !silentJSONParsing && this.responseType === 'json';

    if (strictJSONParsing || (forcedJSONParsing && utils.isString(data) && data.length)) {
      try {
        return JSON.parse(data);
      } catch (e) {
        if (strictJSONParsing) {
          if (e.name === 'SyntaxError') {
            throw enhanceError(e, this, 'E_JSON_PARSE');
          }
          throw e;
        }
      }
    }

    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,
  maxBodyLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;


/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/***/ ((module) => {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/***/ ((module) => {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAxiosError.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAxiosError.js ***!
  \********************************************************/
/***/ ((module) => {

"use strict";


/**
 * Determines whether the payload is an error thrown by Axios
 *
 * @param {*} payload The value to test
 * @returns {boolean} True if the payload is an error thrown by Axios, otherwise false
 */
module.exports = function isAxiosError(payload) {
  return (typeof payload === 'object') && (payload.isAxiosError === true);
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);


/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "./node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "./node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/***/ ((module) => {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "./node_modules/axios/lib/helpers/validator.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/validator.js ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var pkg = __webpack_require__(/*! ./../../package.json */ "./node_modules/axios/package.json");

var validators = {};

// eslint-disable-next-line func-names
['object', 'boolean', 'number', 'function', 'string', 'symbol'].forEach(function(type, i) {
  validators[type] = function validator(thing) {
    return typeof thing === type || 'a' + (i < 1 ? 'n ' : ' ') + type;
  };
});

var deprecatedWarnings = {};
var currentVerArr = pkg.version.split('.');

/**
 * Compare package versions
 * @param {string} version
 * @param {string?} thanVersion
 * @returns {boolean}
 */
function isOlderVersion(version, thanVersion) {
  var pkgVersionArr = thanVersion ? thanVersion.split('.') : currentVerArr;
  var destVer = version.split('.');
  for (var i = 0; i < 3; i++) {
    if (pkgVersionArr[i] > destVer[i]) {
      return true;
    } else if (pkgVersionArr[i] < destVer[i]) {
      return false;
    }
  }
  return false;
}

/**
 * Transitional option validator
 * @param {function|boolean?} validator
 * @param {string?} version
 * @param {string} message
 * @returns {function}
 */
validators.transitional = function transitional(validator, version, message) {
  var isDeprecated = version && isOlderVersion(version);

  function formatMessage(opt, desc) {
    return '[Axios v' + pkg.version + '] Transitional option \'' + opt + '\'' + desc + (message ? '. ' + message : '');
  }

  // eslint-disable-next-line func-names
  return function(value, opt, opts) {
    if (validator === false) {
      throw new Error(formatMessage(opt, ' has been removed in ' + version));
    }

    if (isDeprecated && !deprecatedWarnings[opt]) {
      deprecatedWarnings[opt] = true;
      // eslint-disable-next-line no-console
      console.warn(
        formatMessage(
          opt,
          ' has been deprecated since v' + version + ' and will be removed in the near future'
        )
      );
    }

    return validator ? validator(value, opt, opts) : true;
  };
};

/**
 * Assert object's properties type
 * @param {object} options
 * @param {object} schema
 * @param {boolean?} allowUnknown
 */

function assertOptions(options, schema, allowUnknown) {
  if (typeof options !== 'object') {
    throw new TypeError('options must be an object');
  }
  var keys = Object.keys(options);
  var i = keys.length;
  while (i-- > 0) {
    var opt = keys[i];
    var validator = schema[opt];
    if (validator) {
      var value = options[opt];
      var result = value === undefined || validator(value, opt, options);
      if (result !== true) {
        throw new TypeError('option ' + opt + ' must be ' + result);
      }
      continue;
    }
    if (allowUnknown !== true) {
      throw Error('Unknown option ' + opt);
    }
  }
}

module.exports = {
  isOlderVersion: isOlderVersion,
  assertOptions: assertOptions,
  validators: validators
};


/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "./node_modules/axios/lib/helpers/bind.js");

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a plain Object
 *
 * @param {Object} val The value to test
 * @return {boolean} True if value is a plain Object, otherwise false
 */
function isPlainObject(val) {
  if (toString.call(val) !== '[object Object]') {
    return false;
  }

  var prototype = Object.getPrototypeOf(val);
  return prototype === null || prototype === Object.prototype;
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.trim ? str.trim() : str.replace(/^\s+|\s+$/g, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (isPlainObject(result[key]) && isPlainObject(val)) {
      result[key] = merge(result[key], val);
    } else if (isPlainObject(val)) {
      result[key] = merge({}, val);
    } else if (isArray(val)) {
      result[key] = val.slice();
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

/**
 * Remove byte order marker. This catches EF BB BF (the UTF-8 BOM)
 *
 * @param {string} content with BOM
 * @return {string} content value without BOM
 */
function stripBOM(content) {
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return content;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isPlainObject: isPlainObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim,
  stripBOM: stripBOM
};


/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/app.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/app.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/regenerator */ "./node_modules/@babel/runtime/regenerator/index.js");
/* harmony import */ var _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_1__);


function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var default_layout = "default";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  computed: {},
  data: function data() {
    return {
      file: '',
      csrf_token: document.head.querySelector('meta[name="csrf-token"]').content,
      items: []
    };
  },
  created: function created() {
    var _this = this;

    return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee() {
      return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _this.fetchItems(true);

            case 2:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }))();
  },
  methods: {
    submitFile: function submitFile() {
      var formData = new FormData();
      formData.append('file', this.file);
      axios__WEBPACK_IMPORTED_MODULE_1___default().post('/send-exel-file', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'X-CSRF-TOKEN': this.csrf_token
        }
      }).then(function () {
        console.log('SUCCESS!!');
      })["catch"](function () {
        console.log('FAILURE!!');
      });
    },
    handleFileUpload: function handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    fetchItems: function fetchItems() {
      var _this2 = this;

      return _asyncToGenerator( /*#__PURE__*/_babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().mark(function _callee2() {
        var params, rand, res;
        return _babel_runtime_regenerator__WEBPACK_IMPORTED_MODULE_0___default().wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                params = {};
                rand = Math.random() * 1000;
                _context2.next = 4;
                return axios__WEBPACK_IMPORTED_MODULE_1___default().get("/dashboard-get-items?u=" + rand + "", {
                  params: params
                });

              case 4:
                res = _context2.sent;
                _this2.items = res.data;
                console.log(res.data);

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }))();
    }
  }
});

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/***/ ((module) => {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/regenerator-runtime/runtime.js":
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/***/ ((module) => {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = GeneratorFunctionPrototype;
  define(Gp, "constructor", GeneratorFunctionPrototype);
  define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  });
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  define(Gp, iteratorSymbol, function() {
    return this;
  });

  define(Gp, "toString", function() {
    return "[object Generator]";
  });

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : 0
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, in modern engines
  // we can explicitly access globalThis. In older engines we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  if (typeof globalThis === "object") {
    globalThis.regeneratorRuntime = runtime;
  } else {
    Function("r", "regeneratorRuntime = r")(runtime);
  }
}


/***/ }),

/***/ "./resources/js/components/app.vue":
/*!*****************************************!*\
  !*** ./resources/js/components/app.vue ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _app_vue_vue_type_template_id_f9a0fcb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./app.vue?vue&type=template&id=f9a0fcb4& */ "./resources/js/components/app.vue?vue&type=template&id=f9a0fcb4&");
/* harmony import */ var _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./app.vue?vue&type=script&lang=js& */ "./resources/js/components/app.vue?vue&type=script&lang=js&");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */
;
var component = (0,_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _app_vue_vue_type_template_id_f9a0fcb4___WEBPACK_IMPORTED_MODULE_0__.render,
  _app_vue_vue_type_template_id_f9a0fcb4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/components/app.vue"
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (component.exports);

/***/ }),

/***/ "./resources/js/components/app.vue?vue&type=script&lang=js&":
/*!******************************************************************!*\
  !*** ./resources/js/components/app.vue?vue&type=script&lang=js& ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./app.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5[0].rules[0].use[0]!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/app.vue?vue&type=script&lang=js&");
 /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_babel_loader_lib_index_js_clonedRuleSet_5_0_rules_0_use_0_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/components/app.vue?vue&type=template&id=f9a0fcb4&":
/*!************************************************************************!*\
  !*** ./resources/js/components/app.vue?vue&type=template&id=f9a0fcb4& ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_f9a0fcb4___WEBPACK_IMPORTED_MODULE_0__.render),
/* harmony export */   "staticRenderFns": () => (/* reexport safe */ _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_f9a0fcb4___WEBPACK_IMPORTED_MODULE_0__.staticRenderFns)
/* harmony export */ });
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_app_vue_vue_type_template_id_f9a0fcb4___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib/index.js??vue-loader-options!./app.vue?vue&type=template&id=f9a0fcb4& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/app.vue?vue&type=template&id=f9a0fcb4&");


/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/app.vue?vue&type=template&id=f9a0fcb4&":
/*!***************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib/index.js??vue-loader-options!./resources/js/components/app.vue?vue&type=template&id=f9a0fcb4& ***!
  \***************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "render": () => (/* binding */ render),
/* harmony export */   "staticRenderFns": () => (/* binding */ staticRenderFns)
/* harmony export */ });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "wrapper" }, [
    _c("div", { staticClass: "layout container excess" }, [
      _c("div", { staticClass: "left-side layout excess" }, [
        _c("div", { staticClass: "layout nd-class-0" }, [
          _c("p", { staticClass: "layout nd-class-1" }, [
            _vm._v("\n            Get insights into the big data\n          ")
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "layout nd-class-2" }, [
            _vm._v("\n            Reports\n          ")
          ]),
          _vm._v(" "),
          _c(
            "svg",
            {
              staticClass: "layout nd-class-3",
              attrs: {
                fill: "none",
                height: "28",
                preserveaspectratio: "none",
                viewbox: "0 0 28 28",
                width: "28",
                xmlns: "http://www.w3.org/2000/svg"
              }
            },
            [
              _c("path", {
                attrs: {
                  d:
                    "M20 5H8V9H20V5ZM21 14C20.7348 14 20.4804 13.8946 20.2929 13.7071C20.1054 13.5196 20 13.2652 20 13C20 12.7348 20.1054 12.4804 20.2929 12.2929C20.4804 12.1054 20.7348 12 21 12C21.2652 12 21.5196 12.1054 21.7071 12.2929C21.8946 12.4804 22 12.7348 22 13C22 13.2652 21.8946 13.5196 21.7071 13.7071C21.5196 13.8946 21.2652 14 21 14ZM18 21H10V16H18V21ZM21 10H7C6.20435 10 5.44129 10.3161 4.87868 10.8787C4.31607 11.4413 4 12.2044 4 13V19H8V23H20V19H24V13C24 12.2044 23.6839 11.4413 23.1213 10.8787C22.5587 10.3161 21.7956 10 21 10Z",
                  fill: "#367BF5"
                }
              })
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "layout nd-class-4" }, [
          _c("p", { staticClass: "layout nd-class-5" }, [
            _vm._v("\n            View your results as Excel file\n          ")
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "layout nd-class-6" }, [
            _vm._v("\n            Results\n          ")
          ]),
          _vm._v(" "),
          _c(
            "svg",
            {
              staticClass: "layout nd-class-7",
              attrs: {
                fill: "none",
                height: "28",
                preserveaspectratio: "none",
                viewbox: "0 0 28 28",
                width: "28",
                xmlns: "http://www.w3.org/2000/svg"
              }
            },
            [
              _c("path", {
                attrs: {
                  d:
                    "M21.78 4L26 8.22L10.44 23.8L2 15.35L6.22 11.13L10.44 15.35L21.78 4ZM21.78 6.8L10.44 18.16L6.22 13.99L4.81 15.35L10.44 20.97L23.19 8.22L21.78 6.8Z",
                  fill: "#78909C"
                }
              })
            ]
          )
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "layout nd-class-8" }, [
          _c("p", { staticClass: "layout nd-class-9" }, [
            _vm._v("\n            Track your apps across devices\n          ")
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "layout nd-class-10" }, [
            _vm._v("\n            Metrics\n          ")
          ]),
          _vm._v(" "),
          _c(
            "svg",
            {
              staticClass: "layout nd-class-11",
              attrs: {
                fill: "none",
                height: "28",
                preserveaspectratio: "none",
                viewbox: "0 0 28 28",
                width: "28",
                xmlns: "http://www.w3.org/2000/svg"
              }
            },
            [
              _c("path", {
                attrs: {
                  d:
                    "M15 4V7.03C18.39 7.52 21 10.42 21 13.95C21 14.85 20.82 15.7 20.5 16.49L23.12 18.02C23.68 16.78 24 15.4 24 13.95C24 8.77 20.05 4.5 15 4ZM14 20.95C12.1435 20.95 10.363 20.2125 9.05025 18.8997C7.7375 17.587 7 15.8065 7 13.95C7 10.42 9.61 7.52 13 7.03V4C7.94 4.5 4 8.76 4 13.95C4 16.6022 5.05357 19.1457 6.92893 21.0211C7.85752 21.9497 8.95991 22.6862 10.1732 23.1888C11.3864 23.6913 12.6868 23.95 14 23.95C17.3 23.95 20.23 22.34 22.05 19.86L19.45 18.33C18.17 19.95 16.21 20.95 14 20.95Z",
                  fill: "#78909C"
                }
              })
            ]
          )
        ]),
        _vm._v(" "),
        _c(
          "div",
          {
            staticClass: "layout nd-class-12",
            on: {
              click: function($event) {
                return _vm.submitFile()
              }
            }
          },
          [
            _c("div", { staticClass: "layout fon nd-class-13" }),
            _vm._v(" "),
            _c("div", { staticClass: "input__wrapper" }, [
              _c("input", {
                ref: "file",
                staticClass: "input input__file file-input",
                attrs: { name: "file", type: "file", id: "file", multiple: "" },
                on: {
                  change: function($event) {
                    return _vm.handleFileUpload()
                  }
                }
              }),
              _vm._v(" "),
              _c(
                "label",
                { staticClass: "input__file-button", attrs: { for: "file" } },
                [
                  _c("span", { staticClass: "input__file-icon-wrapper" }, [
                    _c(
                      "svg",
                      {
                        staticClass: "layout nd-class-14",
                        attrs: {
                          alt: "Выбрать файл",
                          fill: "none",
                          height: "32",
                          preserveaspectratio: "none",
                          viewbox: "0 0 33 32",
                          width: "33",
                          xmlns: "http://www.w3.org/2000/svg"
                        }
                      },
                      [
                        _c("path", {
                          attrs: {
                            d:
                              "M20.2836 16.8H17.0836V20H15.4836V16.8H12.2836V15.2H15.4836V12H17.0836V15.2H20.2836V16.8ZM16.2836 8C15.233 8 14.1927 8.20693 13.2221 8.60896C12.2515 9.011 11.3696 9.60028 10.6267 10.3431C9.12644 11.8434 8.28358 13.8783 8.28358 16C8.28358 18.1217 9.12644 20.1566 10.6267 21.6569C11.3696 22.3997 12.2515 22.989 13.2221 23.391C14.1927 23.7931 15.233 24 16.2836 24C18.4053 24 20.4401 23.1571 21.9404 21.6569C23.4407 20.1566 24.2836 18.1217 24.2836 16C24.2836 14.9494 24.0767 13.9091 23.6746 12.9385C23.2726 11.9679 22.6833 11.086 21.9404 10.3431C21.1976 9.60028 20.3157 9.011 19.3451 8.60896C18.3744 8.20693 17.3342 8 16.2836 8V8Z",
                            fill: "#367BF5"
                          }
                        })
                      ]
                    ),
                    _vm._v(" "),
                    _c("img", {
                      staticClass: "input__file-icon",
                      attrs: { width: "25" }
                    })
                  ]),
                  _vm._v(" "),
                  _vm._m(0)
                ]
              )
            ])
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "base-side layout excess" }, [
        _c("div", { staticClass: "nd-class-16" }, [
          _c("div", { staticClass: "layout excess nd-class-17" }, [
            _c("div", { staticClass: "layout nd-class-18" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-19" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-20" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-21" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-22" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-23" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-24" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-25" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-26" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-27" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-28" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-29" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-30" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-31" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-32" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-33" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-34" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-35" }, [
              _vm._v(
                "\n              " +
                  _vm._s(_vm.items[3].company) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-36",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 330 1",
                  width: "330",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "330", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-37" }, [
              _vm._v(
                "\n              " +
                  _vm._s(_vm.items[2].company) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-38",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 330 1",
                  width: "330",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "330", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-39" }, [
              _vm._v(
                "\n              " +
                  _vm._s(_vm.items[1].company) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-40",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 330 1",
                  width: "330",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "330", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-41" }, [
              _vm._v(
                "\n              " +
                  _vm._s(_vm.items[0].company) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-42",
                attrs: {
                  fill: "none",
                  height: "2",
                  preserveaspectratio: "none",
                  viewbox: "0 0 330 2",
                  width: "330",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: {
                    stroke: "#E3E5E6",
                    "stroke-width": "2",
                    x2: "330",
                    y1: "1",
                    y2: "1"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-43" }, [
              _c("div", { staticClass: "layout nd-class-44" }),
              _vm._v(" "),
              _c(
                "svg",
                {
                  staticClass: "layout nd-class-45",
                  attrs: {
                    fill: "none",
                    height: "6",
                    preserveaspectratio: "none",
                    viewbox: "0 0 10 6",
                    width: "10",
                    xmlns: "http://www.w3.org/2000/svg"
                  }
                },
                [
                  _c("path", {
                    attrs: {
                      d:
                        "M1.42001 0L4.59001 3.17L7.76001 0L9.18001 1.41L4.59001 6L0.0100098 1.41L1.42001 0Z",
                      fill: "#069697"
                    }
                  })
                ]
              ),
              _c(
                "svg",
                {
                  staticClass: "layout nd-class-46",
                  attrs: {
                    fill: "none",
                    height: "6",
                    preserveaspectratio: "none",
                    viewbox: "0 0 10 6",
                    width: "10",
                    xmlns: "http://www.w3.org/2000/svg"
                  }
                },
                [
                  _c("path", {
                    attrs: {
                      d:
                        "M4.59 2.83L7.76 6L9.17 4.59L4.59 0L0 4.59L1.42 6L4.59 2.83Z",
                      fill: "#C6CACC"
                    }
                  })
                ]
              ),
              _vm._v(" "),
              _c("p", { staticClass: "layout nd-class-47" }, [
                _vm._v("\n                Data\n              ")
              ])
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "layout excess nd-class-48" }, [
            _c("div", { staticClass: "layout nd-class-49" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-50" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-51" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-52" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-53" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-54" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-55" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-56" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-57" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-58" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-59" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-60" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-61" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-62" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-63" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-64" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-65" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-66" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[3].forecast_ooil_data1) +
                      Number(_vm.items[3].forecast_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-67",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-68" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[2].forecast_ooil_data1) +
                      Number(_vm.items[2].forecast_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-69",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-70" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[1].forecast_ooil_data1) +
                      Number(_vm.items[1].forecast_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-71",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-72" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[0].fact_oliq_data1) +
                      Number(_vm.items[0].fact_oliq_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-73",
                attrs: {
                  fill: "none",
                  height: "2",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 2",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: {
                    stroke: "#E3E5E6",
                    "stroke-width": "2",
                    x2: "118",
                    y1: "1",
                    y2: "1"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-74" }, [
              _vm._v("\n              Summary1\n            ")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "layout excess nd-class-75" }, [
            _c("div", { staticClass: "layout nd-class-76" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-77" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-78" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-79" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-80" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-81" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-82" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-83" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-84" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-85" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-86" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-87" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-88" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-89" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-90" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-91" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-92" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-93" }),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-94",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-95" }),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-96",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-97" }),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-98",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-99" }),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-100",
                attrs: {
                  fill: "none",
                  height: "2",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 2",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: {
                    stroke: "#E3E5E6",
                    "stroke-width": "2",
                    x2: "118",
                    y1: "1",
                    y2: "1"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-101" })
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "layout excess nd-class-102" }, [
            _c("div", { staticClass: "layout nd-class-103" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-104" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-105" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-106" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-107" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-108" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-109" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-110" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-111" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-112" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-113" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-114" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-115" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-116" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-117" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-118" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-119" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-120" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[3].fact_ooil_data1) +
                      Number(_vm.items[3].fact_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-121",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-122" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[2].fact_ooil_data1) +
                      Number(_vm.items[2].fact_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-123",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-124" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[1].fact_ooil_data1) +
                      Number(_vm.items[1].fact_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-125",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-126" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[0].fact_ooil_data1) +
                      Number(_vm.items[0].fact_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-127",
                attrs: {
                  fill: "none",
                  height: "2",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 2",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: {
                    stroke: "#E3E5E6",
                    "stroke-width": "2",
                    x2: "118",
                    y1: "1",
                    y2: "1"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-128" }, [
              _vm._v("\n              Summary2\n            ")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "layout excess nd-class-129" }, [
            _c("div", { staticClass: "layout nd-class-130" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-131" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-132" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-133" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-134" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-135" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-136" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-137" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-138" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-139" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-140" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-141" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-142" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-143" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-144" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-145" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-146" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-147" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[3].forecast_oliq_data1) +
                      Number(_vm.items[3].forecast_oliq_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-148",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-149" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[2].forecast_oliq_data1) +
                      Number(_vm.items[2].forecast_oliq_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-150",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-151" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[1].forecast_oliq_data1) +
                      Number(_vm.items[1].forecast_oliq_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-152",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-153" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[0].forecast_oliq_data1) +
                      Number(_vm.items[0].forecast_oliq_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-154",
                attrs: {
                  fill: "none",
                  height: "2",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 2",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: {
                    stroke: "#E3E5E6",
                    "stroke-width": "2",
                    x2: "118",
                    y1: "1",
                    y2: "1"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-155" }, [
              _vm._v("\n              Summary3\n            ")
            ])
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "layout excess nd-class-156" }, [
            _c("div", { staticClass: "layout nd-class-157" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-158" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-159" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-160" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-161" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-162" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-163" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-164" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-165" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-166" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-167" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-168" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-169" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-170" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-171" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-172" }, [
              _vm._v("\n              Table content\n            ")
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "layout nd-class-173" }),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-174" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[3].forecast_ooil_data1) +
                      Number(_vm.items[3].forecast_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-175",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-176" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[2].forecast_ooil_data1) +
                      Number(_vm.items[2].forecast_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-177",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-178" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[1].forecast_ooil_data1) +
                      Number(_vm.items[1].forecast_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-179",
                attrs: {
                  fill: "none",
                  height: "1",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 1",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: { stroke: "#E3E5E6", x2: "118", y1: "0.5", y2: "0.5" }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-180" }, [
              _vm._v(
                "\n              " +
                  _vm._s(
                    Number(_vm.items[0].forecast_ooil_data1) +
                      Number(_vm.items[0].forecast_ooil_data2)
                  ) +
                  "\n            "
              )
            ]),
            _vm._v(" "),
            _c(
              "svg",
              {
                staticClass: "layout nd-class-181",
                attrs: {
                  fill: "none",
                  height: "2",
                  preserveaspectratio: "none",
                  viewbox: "0 0 118 2",
                  width: "118",
                  xmlns: "http://www.w3.org/2000/svg"
                }
              },
              [
                _c("line", {
                  attrs: {
                    stroke: "#E3E5E6",
                    "stroke-width": "2",
                    x2: "118",
                    y1: "1",
                    y2: "1"
                  }
                })
              ]
            ),
            _vm._v(" "),
            _c("p", { staticClass: "layout nd-class-182" }, [
              _vm._v("\n              Summary4\n            ")
            ])
          ])
        ]),
        _vm._v(" "),
        _c(
          "svg",
          {
            staticClass: "layout nd-class-183",
            attrs: {
              fill: "none",
              height: "32",
              preserveaspectratio: "xMidYMid meet",
              viewbox: "0 0 32 32",
              width: "32",
              xmlns: "http://www.w3.org/2000/svg"
            }
          },
          [
            _c("rect", {
              attrs: { fill: "#F7F9FA", height: "32", rx: "4", width: "32" }
            }),
            _vm._v(" "),
            _c("path", {
              attrs: {
                d:
                  "M12 20.5714H20V19.4286H12V20.5714ZM20 14.2857H17.7143V10.8571H14.2857V14.2857H12L16 18.2857L20 14.2857Z",
                fill: "#78909C"
              }
            })
          ]
        ),
        _c(
          "svg",
          {
            staticClass: "layout nd-class-184",
            attrs: {
              fill: "none",
              height: "32",
              preserveaspectratio: "xMidYMid meet",
              viewbox: "0 0 32 32",
              width: "32",
              xmlns: "http://www.w3.org/2000/svg"
            }
          },
          [
            _c("rect", {
              attrs: { fill: "#F7F9FA", height: "32", rx: "4", width: "32" }
            }),
            _vm._v(" "),
            _c("path", {
              attrs: {
                d:
                  "M19.4285 10.8571H12.5714V13.1429H19.4285V10.8571ZM19.9999 16C19.8484 16 19.703 15.9398 19.5959 15.8326C19.4887 15.7255 19.4285 15.5801 19.4285 15.4286C19.4285 15.277 19.4887 15.1317 19.5959 15.0245C19.703 14.9174 19.8484 14.8571 19.9999 14.8571C20.1515 14.8571 20.2968 14.9174 20.404 15.0245C20.5112 15.1317 20.5714 15.277 20.5714 15.4286C20.5714 15.5801 20.5112 15.7255 20.404 15.8326C20.2968 15.9398 20.1515 16 19.9999 16ZM18.2856 20H13.7142V17.1429H18.2856V20ZM19.9999 13.7143H11.9999C11.5453 13.7143 11.1092 13.8949 10.7877 14.2164C10.4663 14.5379 10.2856 14.9739 10.2856 15.4286V18.8571H12.5714V21.1429H19.4285V18.8571H21.7142V15.4286C21.7142 14.9739 21.5336 14.5379 21.2121 14.2164C20.8906 13.8949 20.4546 13.7143 19.9999 13.7143Z",
                fill: "#78909C"
              }
            })
          ]
        ),
        _vm._v(" "),
        _c("p", { staticClass: "layout nd-class-185" }, [
          _vm._v("\n          Dashboard\n        ")
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "layout nd-class-201" }, [
          _c("div", { staticClass: "layout nd-class-202" }, [
            _vm._v(
              "\n             \n             \n             \n             \n          "
            )
          ]),
          _vm._v(" "),
          _vm._m(1),
          _vm._v(" "),
          _c(
            "svg",
            {
              staticClass: "nd-class-205",
              attrs: {
                fill: "none",
                height: "24",
                preserveaspectratio: "none",
                viewbox: "0 0 24 24",
                width: "24",
                xmlns: "http://www.w3.org/2000/svg"
              }
            },
            [
              _c("path", {
                attrs: { d: "M7 9L12 14L17 9H7Z", fill: "#78909C" }
              })
            ]
          )
        ]),
        _vm._v(" "),
        _vm._m(2),
        _vm._v(" "),
        _vm._m(3),
        _vm._v(" "),
        _vm._m(4),
        _vm._v(" "),
        _vm._m(5),
        _vm._v(" "),
        _vm._m(6),
        _vm._v(" "),
        _vm._m(7)
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "menu-top layout excess fon" }, [
        _c(
          "svg",
          {
            staticClass: "layout nd-class-230",
            attrs: {
              fill: "none",
              height: "1",
              preserveaspectratio: "none",
              viewbox: "0 0 1440 1",
              width: "1440",
              xmlns: "http://www.w3.org/2000/svg"
            }
          },
          [
            _c("line", {
              attrs: {
                stroke: "#E3E5E6",
                "stroke-dasharray": "5 2",
                x2: "1440",
                y1: "0.5",
                y2: "0.5"
              }
            })
          ]
        ),
        _vm._v(" "),
        _vm._m(8)
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "dashboard-head" }, [
        _vm._m(9),
        _vm._v(" "),
        _c("div", { staticClass: "layout nd-class-242" }, [
          _c("div", { staticClass: "layout nd-class-243" }),
          _vm._v(" "),
          _c("p", { staticClass: "layout nd-class-244" }, [
            _vm._v("\n            Help\n          ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "nd-class-245" }),
          _vm._v(" "),
          _c(
            "svg",
            {
              staticClass: "nd-class-246",
              attrs: {
                fill: "none",
                height: "28",
                preserveaspectratio: "xMidYMid meet",
                viewbox: "0 0 28 28",
                width: "28",
                xmlns: "http://www.w3.org/2000/svg"
              }
            },
            [
              _c("path", {
                attrs: {
                  d:
                    "M17.07 13.25L16.17 14.17C15.45 14.89 15 15.5 15 17H13V16.5C13 15.39 13.45 14.39 14.17 13.67L15.41 12.41C15.78 12.05 16 11.55 16 11C16 9.89 15.1 9 14 9C13.4696 9 12.9609 9.21071 12.5858 9.58579C12.2107 9.96086 12 10.4696 12 11H10C10 9.93913 10.4214 8.92172 11.1716 8.17157C11.9217 7.42143 12.9391 7 14 7C15.0609 7 16.0783 7.42143 16.8284 8.17157C17.5786 8.92172 18 9.93913 18 11C18 11.88 17.64 12.67 17.07 13.25ZM15 21H13V19H15V21ZM14 4C12.6868 4 11.3864 4.25866 10.1732 4.7612C8.95991 5.26375 7.85752 6.00035 6.92893 6.92893C5.05357 8.8043 4 11.3478 4 14C4 16.6522 5.05357 19.1957 6.92893 21.0711C7.85752 21.9997 8.95991 22.7362 10.1732 23.2388C11.3864 23.7413 12.6868 24 14 24C16.6522 24 19.1957 22.9464 21.0711 21.0711C22.9464 19.1957 24 16.6522 24 14C24 8.47 19.5 4 14 4Z",
                  fill: "#C6CACC"
                }
              })
            ]
          )
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("span", { staticClass: "input__file-button-text" }, [
      _c("p", { staticClass: "layout nd-class-15" }, [
        _vm._v("\n            Add EXCEL")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "nd-class-203" }, [
      _c("p", { staticClass: "layout nd-class-204" }, [
        _vm._v("\n              Aug 21, 2021 · Sep 21 2021\n            ")
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "layout nd-class-206" }, [
      _c("div", { staticClass: "layout nd-class-207" }),
      _vm._v(" "),
      _c("div", { staticClass: "nd-class-208" }, [
        _c("p", { staticClass: "layout nd-class-209" }, [
          _vm._v("\n              Search...\n            ")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "layout nd-class-210" }, [
      _c("div", { staticClass: "layout nd-class-211" }),
      _vm._v(" "),
      _c("div", { staticClass: "nd-class-212" }, [
        _c("p", { staticClass: "layout nd-class-213" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "layout nd-class-214" }, [
      _c("div", { staticClass: "layout nd-class-215" }),
      _vm._v(" "),
      _c("div", { staticClass: "nd-class-216" }, [
        _c("p", { staticClass: "layout nd-class-217" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "layout nd-class-218" }, [
      _c("div", { staticClass: "layout nd-class-219" }),
      _vm._v(" "),
      _c("div", { staticClass: "nd-class-220" }, [
        _c("p", { staticClass: "layout nd-class-221" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "layout nd-class-222" }, [
      _c("div", { staticClass: "layout nd-class-223" }),
      _vm._v(" "),
      _c("div", { staticClass: "nd-class-224" }, [
        _c("p", { staticClass: "layout nd-class-225" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "layout nd-class-226" }, [
      _c("div", { staticClass: "layout nd-class-227" }),
      _vm._v(" "),
      _c("div", { staticClass: "nd-class-228" }, [
        _c("p", { staticClass: "layout nd-class-229" })
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "layout nd-class-231" }, [
      _c("div", { staticClass: "layout excess nd-class-232" }),
      _vm._v(" "),
      _c("div", { staticClass: "layout excess nd-class-233" }, [
        _c("p", { staticClass: "layout nd-class-234" }, [
          _vm._v("\n              Configure\n            ")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "layout excess nd-class-235" }, [
        _c("p", { staticClass: "layout nd-class-236" }, [
          _vm._v("\n              My campaigns\n            ")
        ])
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "layout excess fon nd-class-237" }, [
        _c("div", { staticClass: "layout nd-class-238" }),
        _vm._v(" "),
        _c("p", { staticClass: "layout nd-class-239" }, [
          _vm._v("\n              Analyze\n            ")
        ])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "dashboard-head wrapper-1 layout" }, [
      _c("div", { staticClass: "dashboard-head layout fon wrapper-2 " }),
      _vm._v(" "),
      _c("div", { staticClass: "layout logo-box" }, [
        _c("div", { staticClass: "layout logo-shadow fon" }),
        _vm._v(" "),
        _c("p", { staticClass: "dashboard-name layout" }, [
          _vm._v("\n              Dashboard\n            ")
        ]),
        _vm._v(" "),
        _c("p", { staticClass: "dashboard-d layout" }, [
          _vm._v("\n              D\n            ")
        ])
      ]),
      _vm._v(" "),
      _c(
        "div",
        {
          staticClass: "layout canvas-wrapper",
          staticStyle: {
            "background-image": "url('http://0.0.0.0/images/users/Male.png')"
          }
        },
        [
          _c("div", { staticClass: "canvas-message" }, [
            _c("pre", [
              _vm._v(
                "Failed to transform RECTANGLE Fernando Pidrilio\nReferenceError: OffscreenCanvas is not defined"
              )
            ])
          ])
        ]
      ),
      _vm._v(" "),
      _c("div", { staticClass: "upgrade-wrapper" }, [
        _c("div", { staticClass: "layout upgrade-wrapper-shadow" }, [
          _c("div", { staticClass: "layout upgrade-wrapper-style fon" }),
          _vm._v(" "),
          _c("p", { staticClass: "layout upgrade-paragraph" }, [
            _vm._v("\n                upgrade\n              ")
          ]),
          _vm._v(" "),
          _c("div", { staticClass: "nd-class-240" }),
          _vm._v(" "),
          _c("div", { staticClass: "nd-class-241" })
        ])
      ])
    ])
  }
]
render._withStripped = true



/***/ }),

/***/ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!********************************************************************!*\
  !*** ./node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ normalizeComponent)
/* harmony export */ });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "./node_modules/axios/package.json":
/*!*****************************************!*\
  !*** ./node_modules/axios/package.json ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"name":"axios","version":"0.21.4","description":"Promise based HTTP client for the browser and node.js","main":"index.js","scripts":{"test":"grunt test","start":"node ./sandbox/server.js","build":"NODE_ENV=production grunt build","preversion":"npm test","version":"npm run build && grunt version && git add -A dist && git add CHANGELOG.md bower.json package.json","postversion":"git push && git push --tags","examples":"node ./examples/server.js","coveralls":"cat coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js","fix":"eslint --fix lib/**/*.js"},"repository":{"type":"git","url":"https://github.com/axios/axios.git"},"keywords":["xhr","http","ajax","promise","node"],"author":"Matt Zabriskie","license":"MIT","bugs":{"url":"https://github.com/axios/axios/issues"},"homepage":"https://axios-http.com","devDependencies":{"coveralls":"^3.0.0","es6-promise":"^4.2.4","grunt":"^1.3.0","grunt-banner":"^0.6.0","grunt-cli":"^1.2.0","grunt-contrib-clean":"^1.1.0","grunt-contrib-watch":"^1.0.0","grunt-eslint":"^23.0.0","grunt-karma":"^4.0.0","grunt-mocha-test":"^0.13.3","grunt-ts":"^6.0.0-beta.19","grunt-webpack":"^4.0.2","istanbul-instrumenter-loader":"^1.0.0","jasmine-core":"^2.4.1","karma":"^6.3.2","karma-chrome-launcher":"^3.1.0","karma-firefox-launcher":"^2.1.0","karma-jasmine":"^1.1.1","karma-jasmine-ajax":"^0.1.13","karma-safari-launcher":"^1.0.0","karma-sauce-launcher":"^4.3.6","karma-sinon":"^1.0.5","karma-sourcemap-loader":"^0.3.8","karma-webpack":"^4.0.2","load-grunt-tasks":"^3.5.2","minimist":"^1.2.0","mocha":"^8.2.1","sinon":"^4.5.0","terser-webpack-plugin":"^4.2.3","typescript":"^4.0.5","url-search-params":"^0.10.0","webpack":"^4.44.2","webpack-dev-server":"^3.11.0"},"browser":{"./lib/adapters/http.js":"./lib/adapters/xhr.js"},"jsdelivr":"dist/axios.min.js","unpkg":"dist/axios.min.js","typings":"./index.d.ts","dependencies":{"follow-redirects":"^1.14.0"},"bundlesize":[{"path":"./dist/axios.min.js","threshold":"5kB"}]}');

/***/ })

}]);
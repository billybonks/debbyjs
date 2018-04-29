const fetch = require('node-fetch');

function arrayToQueryParams(array) {
  return array.reduce((str, json, index) => {
    str += jsonToQueryParams(json);
    return str += index < array.length - 1 ? '&' : '';
  }, '');
}

function jsonToQueryParams(json) {
  return Object.keys(json).reduce((str, key, index) => {
    str += `${key}=${json[key]}`;
    return str += index < --Object.keys(json).length ? '&' : '';
  }, '');
}

function toQueryParams(body) {
  return `${Array.isArray(body) ? arrayToQueryParams(body) : jsonToQueryParams(body)}`;
}

module.exports = function(url, options) {
  if(options.method === 'GET'){
    let params = toQueryParams(options.body); // eslint-disable-line no-unused-vars
    delete options.body;
    url = `${url}${url.indexOf('?') ? '&' : '?'}{params}`;
  } else {
    options.body = JSON.stringify(options.body);
  }
  return fetch(url, options)
    .then((response) => {
      if (!response.ok) {
        throw Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then((json) => {
      if (json.error) {
        throw Error(json.error.message || json.error);
      }
      return json;
    });
};

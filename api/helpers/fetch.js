const request = require('request');
const _ = require('lodash');
const logger = require('./logger');
const config = require('config');

const getRequest = req => _.assign({}, req, {
  headers: {
    'X-REQUEST-ID': req.requestId,
    Authorization: `Token token=${config.get('access_token')}`,
  },
});

function fetch(options) {
  return new Promise((resolve, reject) => {
    const start = process.hrtime();
    const req = getRequest(options);
    request(req, (err, response, body) => {
      const message = `REQUEST ${req.method} ${req.url}`;
      let statusCode;
      if (err) {
        statusCode = err.code === 'ECONNREFUSED' ? 503 : 500;
        const error = { status: statusCode, error: err };
        reject(error);
      } else if (!_.includes([200, 201, 204], response.statusCode)) {
        statusCode = response.statusCode;
        const failure = { status: statusCode };
        reject(failure);
      } else {
        statusCode = response.statusCode;
        resolve(body);
      }
      logger.request(message, _.pick(options, logger.requestWhitelist), { res: { statusCode } }, start);
    });
  });
}

module.exports = req => ({
  get: (url, extraOptions) => {
    const options = _.merge({ method: 'GET', json: true, url, requestId: req.requestId }, extraOptions);
    return fetch(options);
  },
  post: (url, json, extraOptions) => {
    const options = _.merge({ method: 'POST', json, url, requestId: req.requestId }, extraOptions);
    return fetch(options);
  },
  put: (url, extraOptions) => {
    const options = _.merge({ method: 'PUT', json: true, url, requestId: req.requestId }, extraOptions);
    return fetch(options);
  },
});

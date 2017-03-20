/* eslint no-param-reassign: ["error", { "props": false }]*/
const uuid = require('node-uuid');
const winston = require('winston');
const expressWinston = require('express-winston');
const WinstonGraylog2 = require('winston-graylog2');
const grayLogConfig = require('config').get('graylog');
const _ = require('lodash');
const winstonConsole = new (winston.transports.Console)({
  name: 'console',
  colorize: true,
  timestamp: true,
  prettyPrint: false,
});
const winstonGraylog = new (WinstonGraylog2)({
  name: 'graylog',
  graylog: {
    servers: [{ host: grayLogConfig.host, port: grayLogConfig.port }],
    facility: `sphinx-${process.env.NODE_ENV}`,
  },
});
const logger = new (winston.Logger)({ transports: [winstonConsole, winstonGraylog] });
const requestWhitelist = ['url', 'headers', 'method', 'httpVersion',
'originalUrl', 'query', 'referer', 'requestId', 'userId'];

exports.requestWhitelist = requestWhitelist;

exports.winston = (req, res, next) => {
  req.referer = req.get('referer');
  req.requestId = res ? res.get('x-request-id') : uuid.v4();
  req.userId = _.get(req, ['user', 'nameID'], 'anonymous');
  next();
};

exports.express = expressWinston.logger({
  transports: [winstonConsole, winstonGraylog],
  meta: true,
  requestWhitelist,
  colorStatus: true,
});

exports.request = (message, req, res, start) => {
  const end = process.hrtime(start);
  const responseTime = Math.ceil(end[0] * 1000 + (end[1] / 1000000));
  this.info(message, { res, req, responseTime });
};

exports.info = logger.info;
exports.debug = logger.debug;

const url = require('url');
const config = require('config');

const formatUrl = (key, path, query) => {
  const host = config.get(key);
  return url.format({ protocol: 'http', host, pathname: path, search: query });
};

exports.quester = (path, query) => formatUrl('quester', path, query);
exports.rods = (path, query) => formatUrl('rods', path, query);
exports.blendHistory = () => formatUrl('elasticsearch');

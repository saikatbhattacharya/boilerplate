const _ = require('lodash');
const path = require('path');

const BASE_PATH = './node_modules/bootstrap-sass/assets/stylesheets/bootstrap/';

exports.loadVariables = () => (path.join(BASE_PATH, '_variables.scss'));

exports.loadMixins = mixins => (
  _.map(mixins, mixin => (path.join(BASE_PATH, 'mixins', `_${mixin}.scss`)))
);

import numeral from 'numeral';
import moment from 'moment';
import _ from 'lodash';
import sorty from 'sorty';
import Handlebars from 'handlebars';

const marked = require('marked');

const renderer = new marked.Renderer();

const unknownType = value => value;

export function formatCurrency(number) {
  return numeral(number).format('($0,0.00)');
}

export function unformatCurrency(amount) {
  return numeral().unformat(amount);
}

export function formatDate(date) {
  const tempDate = moment(new Date(date.replace(/-/g, '/')));
  return tempDate.isValid() ? tempDate.format('MM/DD/YYYY') : '--';
}

export function formatDateTime(date, formatString = 'MM/DD/YYYY hh:mm A') {
  return moment(new Date(date)).format(formatString);
}

export function formatNumber(number, numberFormat = '(0.00)') {
  return numeral(number).format(numberFormat);
}

export function formatInteger(number) {
  return numeral().unformat(number);
}

const FORMATTERS = {
  date: value => formatDate(value),
  months: value => `${value} (months)`,
  currency: value => formatCurrency(value),
  number: value => formatNumber(value),
  days: value => `${formatInteger(value)} Days Remaining`,
  percentage: value => `${formatNumber(value, '(0.000)')} %`,
};

const CONVERTERS = {
  number: value => (_.isNull(value) ? value : Number(formatNumber(value))),
  currency: value => (_.isNull(value) ? value : Number(unformatCurrency(value))),
  percentage: value => (_.isNull(value) ? value : _.replace(`${formatNumber(value, '(0.000)')}`, '.000', '')),
};

export function format(type, value) {
  const formatter = _.get(FORMATTERS, type, unknownType);
  return formatter.apply(this, [value]);
}
// TODO: move isBlank to common utils
export function isBlank(value) {
  if (_.isNumber(value)) {
    return _.isNaN(value);
  } else if (_.isArray(value)) {
    return _.isEmpty(_.compact(_.flattenDeep(value)));
  }
  return _.isEmpty(value);
}

export function formatValue(type, value) {
  if (isBlank(value)) return '--';
  else if (value === 'NA') return value;
  return format(type, value);
}

export function convert(type, value) {
  const converter = _.get(CONVERTERS, type, unknownType);
  return converter.apply(this, [value]);
}

export function formatName(names, separator = ' ') {
  if (_.every(names, name => _.isEmpty(name))) return '';
  return _.chain(names)
    .map(name => _.trim(name))
    .join(separator)
    .trim()
    .value();
}

export function sort(array, sortOptions) {
  return sorty(sortOptions, array);
}

export function convertToCamelCase(string, delimeter, suffix) {
  const regExp = new RegExp(`(${delimeter}\\w)`, 'g');
  return string.toLowerCase().replace(regExp, m => m[1].toUpperCase()).concat(suffix);
}

/* eslint-disable */
// Monkey patch copied from marked
// TODO: Refactor this code
renderer.link = function (href, title, text) {
  if (this.options.sanitize) {
    try {
      var prot = decodeURIComponent(unescape(href))
        .replace(/[^\w:]/g, '')
        .toLowerCase();
    } catch (e) {
      return '';
    }
    if (prot.indexOf('javascript:') === 0 || prot.indexOf('vbscript:') === 0) {
      return '';
    }
  }
  var out = '<a target="_blank" href="' + href + '"';
  if (title) {
    out += ' title="' + title + '"';
  }
  out += '>' + text + '</a>';
  return out;
};
/* eslint-enable */

export function rawMarkup(text) {
  const markUpData = marked(text || '', { sanitize: false, breaks: true, renderer });
  return { __html: markUpData };
}

export function chunkArray(array, chunkSize) {
  let fragmentedList = [];
  const listSize = array.length;
  if (listSize && listSize > 0) {
    fragmentedList = _.chunk(array, chunkSize);
  }
  return fragmentedList;
}

export function trimString(data) {
  if (_.isEmpty(data)) return '';
  return data.trim();
}

export function handlerbarHelpers() {
  Handlebars.registerHelper('trim', data => trimString(data));
  Handlebars.registerHelper('format', (type, data) => formatValue(type, data));
}

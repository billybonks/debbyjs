//const freq = require('freq');
// const moment = require('moment-timezone');
//const { logError } = require('../lib/rollbar');

const util = {

  // now() {
  //   const nowMoment = moment.utc().tz('Asia/Singapore');
  //   return new Date(nowMoment.year(), nowMoment.month(), nowMoment.date(),
  //     nowMoment.hours(), nowMoment.minutes(), nowMoment.seconds());
  // },

  isEmptyObject(object) {
    return JSON.stringify(object) === '{}';
  },

  arrayHasValues(array) {
    return array.length > 0 || undefined;
  },

  sample(array) {
    return array[Math.floor(Math.random() * array.length)];
  },

  unique(array) {
    return [...new Set(array)];
  },

  capitalize(string) {
    return `${string.charAt(0).toUpperCase()}${string.slice(1).toLowerCase()}`;
  },

  humanize(string) {
    return string.replace(/\b\w{2,}/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
  },

  humanizeOr(string) {
    return util.naturalSort(string.split('/'))
      .map((str, index, arr) => `${arr.length > 1 && index === arr.length - 1 ? ', or ' : index ? ', ' : ''}${str.trim()}`)
      .join('');
  },

  numberToLetter(index, isUpperCase=true) {
    return String.fromCharCode((isUpperCase ? 65 : 97) + index);
  },

  includesIgnoreCase(array, item) {
    return array.map((object) => object.toLowerCase()).includes(item.toLowerCase());
  },

  flatten(arr) {
    return arr.reduce((flat, toFlatten) => {
      return flat.concat(Array.isArray(toFlatten) ? util.flatten(toFlatten) : toFlatten);
    }, []);
  },

  compact(arr) {
    return arr.filter((item) => item);
  },
};

module.exports = util;

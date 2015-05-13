'use strict';

var Svgo = require('svgo');
var Promise = require('promise');
var merge = require('merge');

exports.name = 'svgo';
exports.outputFormat = 'svg';

exports.renderAsync = function (str, options, locals) {
  return new Promise(function (resolve, reject) {
    var svgo = new Svgo(merge(options, locals));
    svgo.optimize(str, function (result) {
      if (result.data) {
        return resolve(result['data']);
      }
      else {
        reject(result)
      }
    });
  });
};

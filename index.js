'use strict';

var Svgo = require('svgo');
var SvgoSync = require('svgo-sync');
var Promise = require('promise');
var extend = require('extend-shallow');

exports.name = 'svgo';
exports.inputFormat = ['svg', 'svgo'];
exports.outputFormat = 'svg';

exports.render = function (str, options, locals) {
  var svgo = new SvgoSync(extend({}, options, locals));
  var result = svgo.optimizeSync(str);

  return result.data;
}

exports.renderAsync = function (str, options, locals) {
  return new Promise(function (resolve, reject) {
    var svgo = new Svgo(extend({}, options, locals));
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

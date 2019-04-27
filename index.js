'use strict';

const Svgo = require('svgo');
const extend = require('extend-shallow');
const deasync = require('deasync');

exports.name = 'svgo';
exports.inputFormat = ['svg', 'svgo'];
exports.outputFormat = 'svg';

exports.render = function(str, options, locals) {
  let returnValue;
  let done = false;

  const svgo = new Svgo(extend({}, options, locals));

  svgo.optimize(str).then(result => {
    returnValue = result.data;
    done = true;
  });

  deasync.loopWhile(() => {
    return !done;
  });

  return returnValue;
};

exports.renderAsync = function(str, options, locals) {
  const svgo = new Svgo(extend({}, options, locals));
  return svgo.optimize(str).then(result => {
    return result.data;
  });
};

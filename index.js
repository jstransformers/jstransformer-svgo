'use strict';

const Svgo = require('svgo');
const extend = require('extend-shallow');

let encodeSVGDatauri = null;

exports.name = 'svgo';
exports.inputFormat = ['svg', 'svgo'];
exports.outputFormat = 'svg';

exports.render = function(str, options, locals) {
  let error;
  let returnValue;
  let done = false;

  const svgo = new Svgo(extend({}, options, locals));

  optimizeSyncCallback(svgo, str, undefined, (err, result) => {
    error = err;
    returnValue = result.data;
    done = true;
  });

  if (!done) {
    throw new Error('svgo did not complete sychronously');
  }

  if (error) {
    throw error;
  }

  return returnValue;
};

exports.renderAsync = function(str, options, locals) {
  const svgo = new Svgo(extend({}, options, locals));
  return svgo.optimize(str).then(result => {
    return result.data;
  });
};

function optimizeSyncCallback(svgo, svgstr, info, cb) {
  // Coppied from https://github.com/svg/svgo/blob/d6e462b679a11376694c948c81e5c984c3db8bae/lib/svgo.js#L24-L57
  if (svgo.config.error) {
    cb(svgo.config.error);
    return;
  }

  const {config} = svgo;
  const maxPassCount = config.multipass ? 10 : 1;
  let counter = 0;
  let prevResultSize = Number.POSITIVE_INFINITY;

  function optimizeOnceCallback(svgjs) {
    if (svgjs.error) {
      cb(svgjs.error);
      return;
    }

    if (++counter < maxPassCount && svgjs.data.length < prevResultSize) {
      prevResultSize = svgjs.data.length;
      svgo._optimizeOnce(svgjs.data, info, optimizeOnceCallback);
    } else {
      if (config.datauri) {
        encodeSVGDatauri =
          encodeSVGDatauri || require('svgo/lib/svgo/tools').encodeSVGDatauri;

        svgjs.data = encodeSVGDatauri(svgjs.data, config.datauri);
      }

      if (info && info.path) {
        svgjs.path = info.path;
      }

      cb(null, svgjs);
    }
  }

  svgo._optimizeOnce(svgstr, info, optimizeOnceCallback);
}

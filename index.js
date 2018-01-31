'use strict'

const Svgo = require('svgo')
const SvgoSync = require('svgo-sync')
const extend = require('extend-shallow')

exports.name = 'svgo'
exports.inputFormat = ['svg', 'svgo']
exports.outputFormat = 'svg'

exports.render = function (str, options, locals) {
  const svgo = new SvgoSync(extend({}, options, locals))
  const result = svgo.optimizeSync(str)

  return result.data
}

exports.renderAsync = function (str, options, locals) {
  const svgo = new Svgo(extend({}, options, locals))
  return svgo.optimize(str).then(result => result.data)
}

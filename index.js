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
  return new Promise((resolve, reject) => {
    const svgo = new Svgo(extend({}, options, locals))
    svgo.optimize(str, result => {
      if (result.data) {
        return resolve(result.data)
      }
      reject(result)
    })
  })
}

'use strict';

var assert = require('assert');
var fs = require('fs');
var join = require('path').join;
var test = require('testit');
var transform = require('../');

var input = "<svg version='1.1' width='10' height='20'>\n  test\n</svg>";
var expected = '<svg width="10" height="20">test</svg>';

function assertEqual(output, expected) {
  console.log('   Output:\t'   + JSON.stringify(output));
  console.log('   Expected:\t' + JSON.stringify(expected));
  assert.equal(output, expected);
}

test(transform.name, function (done) {
  transform.renderAsync(input).then(function (output) {
    assertEqual(output, expected);
    done();
  }, function (err) {
  	done(err);
  });
});

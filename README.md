# jstransformer-svgo

[SVGO](https://github.com/svg/svgo) support for [JSTransformers](https://github.com/jstransformers/jstransformer).

[![Build Status](https://img.shields.io/travis/jstransformers/jstransformer-svgo/master.svg)](https://travis-ci.org/jstransformers/jstransformer-svgo)
[![Coverage Status](https://img.shields.io/codecov/c/github/jstransformers/jstransformer-svgo/master.svg)](https://codecov.io/gh/jstransformers/jstransformer-svgo)
[![Dependency Status](https://img.shields.io/david/jstransformers/jstransformer-svgo/master.svg)](http://david-dm.org/jstransformers/jstransformer-svgo)
[![Greenkeeper badge](https://badges.greenkeeper.io/jstransformers/jstransformer-svgo.svg)](https://greenkeeper.io/)
[![NPM version](https://img.shields.io/npm/v/jstransformer-svgo.svg)](https://www.npmjs.org/package/jstransformer-svgo)

## Installation

    npm install jstransformer-svgo

## API

```js
var svgo = require('jstransformer')(require('jstransformer-svgo'))

svgo.renderFile('hello.svg').body
//=> Optimized hello.svg file
```

## License

MIT

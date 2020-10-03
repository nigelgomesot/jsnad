'use strict'

const { test } = require('tap')
const req = require('../req')

test('handles network errors', ({ strictDeepEqual, end }) => {
  req('http://error.com', (err, data) => {
    strictDeepEqual(err, Error('network error'))
    end()
  })
})

test('responds with data',  ({ ok, ifError, strictDeepEqual, end }) => {
  req('http://ok.com', (err, data) => {
    ifError(err)
    ok(Buffer.isBuffer(data))
    strictDeepEqual(data, Buffer.from('ok'))
    end()
  })
})

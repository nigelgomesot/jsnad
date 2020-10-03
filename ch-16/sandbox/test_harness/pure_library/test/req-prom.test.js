'use strict'

const { test } = require('tap')
const  reqPromise = require('../req-prom')

test('handles network error', async ({ rejects }) => {
  await rejects(reqPromise('http://error.com'), Error('network error'))
})

test('responds with data', async ({ ok, strictDeepEqual }) => {
  const data = await reqPromise('http://ok.com')
  ok(Buffer.isBuffer(data))
  strictDeepEqual(data, Buffer.from('ok'))
})

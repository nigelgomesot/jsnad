'use strict'

const { test } = require('tap')
const storePromise = require('../store')

test('handles store error', async ({ rejects }) => {
  await rejects(storePromise(5), Error('input must be a buffer'))
})

test('stores data and returns id', async ({ ok, equal }) => {
  const data = await storePromise(Buffer.from('ok'))
  ok(typeof data['id'] === 'string')
  equal(data['id'].length, 4)
})

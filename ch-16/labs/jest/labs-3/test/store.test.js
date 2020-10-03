'use strict'

global.setTimeout = require('timers').setTimeout
const storePromise = require('../store')

test('handles store errors', async () => {
  await expect(storePromise('ok'))
          .rejects
          .toStrictEqual(Error('input must be a buffer'))
})

test('stores value & returns 4 digit id', async () => {
  const data =  await storePromise(Buffer.from('ok'))
  expect(typeof data['id']).toStrictEqual('string')
  expect(data['id'].length).toStrictEqual(4)
})

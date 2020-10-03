'use strict'

global.setTimeout = require('timers').setTimeout
const reqPromise = require('../req-prom')

test('handles network errors', async () => {
  await expect(reqPromise('http://error.com'))
          .rejects
          .toStrictEqual(Error('network error'))
})

test('responds with data', async () => {
  const data = await reqPromise('http://ok.com')
  expect(Buffer.isBuffer(data)).toBeTruthy()
  expect(data).toStrictEqual(Buffer.from('ok'))
})

'use strict'

const req = require('../req')

test('handles network error', complete => {
  req('http://error.com', err => {
    expect(err).toStrictEqual(Error('network error'))
    complete()
  })
})

test('responds with data', complete => {
  req('http://example.com', (err, data) => {
    expect(err == null).toBe(true)
    expect(Buffer.isBuffer(data)).toBeTruthy()
    expect(data).toStrictEqual(Buffer.from('ok'))
    complete()
  })
})

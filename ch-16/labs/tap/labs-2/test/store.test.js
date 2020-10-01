const { test, ifError } = require('tap')
const store = require('../store')

test('handles store errors', ({ strictDeepEqual, end }) => {
  store('a', (err, data) => {
    strictDeepEqual(err, Error('input must be a buffer'))
    end()
  })
})

test('stores buffer data & responds with id', ({ ifError, equal, end }) => {
  store(Buffer.from('a'), (err, data) => {
    ifError(err)
    equal(data['id'].length, 4)
    end()
  })
})

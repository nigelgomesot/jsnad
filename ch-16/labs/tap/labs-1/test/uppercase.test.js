const { test } = require('tap')
const uppercase = require('../uppercase')

test('throws error when input is not a string', async ({ throws }) => {
  throws(() => uppercase(null), Error('input must be a string'))
  throws(() => uppercase(5), Error('input must be a string'))
  throws(() => uppercase(true), Error('input must be a string'))
})

test('returns upcased string', async ({ equal }) => {
  equal(uppercase('a'), 'A')
  equal(uppercase('abc'), 'ABC')
})

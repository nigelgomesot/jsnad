const { test } = require('tap')
const add = require('../add')

test('throws TypeError when inputs are not numbers', async ({ throws }) => {
  throws(() => add('5','5'), Error('input must be numbers'))
  throws(() => add(5,'5'), Error('input must be numbers'))
  throws(() => add('5',5), Error('input must be numbers'))
  throws(() => add({},null), Error('input must be numbers'))
})

test('adds two numbers', async ({ equal }) => {
  equal(add(5,5), 10)
  equal(add(5,-5), 0)
})

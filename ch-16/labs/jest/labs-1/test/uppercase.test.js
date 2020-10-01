'use strict'

const uppercase = require('../uppercase')

test('throw when input not a string', async () => {
  expect(() => uppercase(1)).toThrowError(Error('input must be a string'))
  expect(() => uppercase(true)).toThrowError(Error('input must be a string'))
  expect(() => uppercase(null)).toThrowError(Error('input must be a string'))
})

test('upcases given string', async () => {
  expect(uppercase('a')).toStrictEqual('A')
  expect(uppercase('abc')).toStrictEqual('ABC')
})

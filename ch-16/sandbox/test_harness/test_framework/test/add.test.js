'use strict'

const add = require('../add')

test('throw when input not numbers', async () => {
  expect(() => add('5','5')).toThrowError(
    TypeError('input must be numbers')
  )
  expect(() => add('5',5)).toThrowError(
    TypeError('input must be numbers')
  )
  expect(() => add(5,'5')).toThrowError(
    TypeError('input must be numbers')
  )
  expect(() => add({},null)).toThrowError(
    TypeError('input must be numbers')
  )
})

test('adds two numbers', async () => {
  expect(add(5,5)).toStrictEqual(10)
  expect(add(5,-5)).toStrictEqual(0)
})

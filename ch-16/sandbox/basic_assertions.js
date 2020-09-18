'use strict'

const assert = require('assert')
const { resolve } = require('path')

const val1 = 1
const val2 = 2
const obj1 = { one: 1 }
const obj2 = { two: 2 }

assert.ok(val1)

if (false)
  assert.ok(val2)

if (false)
  assert.equal(val1, val2)

if (false)
  assert.notEqual(val1, val1)

if (false)
 assert.strictEqual(val1, 'true')

if (false)
 assert.deepEqual(obj1, obj2)

if (false)
 assert.deepEqual(obj1, { one: '1'})

if (false)
 assert.notDeepEqual(obj1, obj1)

if (false)
 assert.deepStrictEqual(obj1, obj1)

if (false)
 assert.deepStrictEqual(obj1, { one: '1'})

if (false)
 assert.notDeepStrictEqual(obj1, { one: '1'})

if (false)
 assert.notDeepStrictEqual(obj1, { one: '1'})

const fnError = () => { throw 'Error' }

if (false)
  assert.throws(fnError)

const fnNoError = () => { return }

if (false)
  assert.doesNotThrow(fnNoError)

if (false)
 assert.rejects(Promise.resolve(''))

if (false)
 assert.doesNotReject(Promise.reject(''))

if (false)
  assert.ifError(0)

const str = 'hello'

if (false)
  assert.match(str, /heLLo/)

if (false)
  assert.doesNotMatch(str, /hello/)

if (false)
  assert.fail()

const add = (num1, num2) => {
  return num1 + num2
}
const result = add(2,2)
assert.equal(typeof result, 'number')
assert.strictEqual(result, 4)

console.log('completed')

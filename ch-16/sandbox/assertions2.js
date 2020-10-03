'use strict'

const assert = require('assert')

// strict & coercive checks
const add1 = (num1, num2) => {
  return (num1 + num2).toString()
}
assert.equal(add1(2,2), 4)
// assert.equal(typeof add1(2,2), 'number')
// assert.strictEqual(add1(2,2), 4)
// assert.strict.equal(add1(2,2), 4)


// Deep equality checks
const obj1 = { id: 1, name: { first: 'John', last: 'Doe'} }
assert.equal(obj1, obj1)
// assert.equal(obj1, { id: 1, name: { first: 'John', last: 'Doe'} })
assert.deepEqual(obj1, { id: 1, name: { first: 'John', last: 'Doe'} })
assert.deepEqual(obj1, { id: '1', name: { first: 'John', last: 'Doe'} })
// assert.deepStrictEqual(obj1, { id: '1', name: { first: 'John', last: 'Doe'} })
// assert.strict.deepEqual(obj1, { id: '1', name: { first: 'John', last: 'Doe'} })


// Error handling checks

// Synchronous
const add2 = (num1, num2) => {
  if (typeof num1 !== 'number' || typeof num2 !== 'number')
    throw TypeError('num1, num2 must be numbers')

  return (num1 + num2).toString()
}
assert.throws(() => add2('5','5'), TypeError('num1, num2 must be numbers'))
assert.doesNotThrow(() => add2(5,5))

// Callbacks
const pseudoRequest1 = (url, cb) => {
  setTimeout(() => {
    if (url === 'http://error.com')
      cb(Error('network error'))
    else
      cb(null, Buffer.from('ok'))
  }, 300)
}
pseudoRequest1('http://ok.com', (err, data) => {
  assert.ifError(err)
})
pseudoRequest1('http://error.com', (err, data) => {
  assert.strict.deepEqual(err, Error('network error'))
})

// Promise API
const { promisify } = require('util')
const setTimeoutPromise = promisify(setTimeout)
const pseudoRequest2 = async (url) => {
  await setTimeoutPromise(300)

  if (url === 'http://error.com')
    throw Error('network error')
  else
    return Buffer.from('ok')
}
assert.doesNotReject(pseudoRequest2('http://ok.com'))
assert.rejects(pseudoRequest2('http://error.com'), Error('network error'))

console.log('done')


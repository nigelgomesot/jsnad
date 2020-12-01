
const assert = require('assert')

class CustomEventEmitter {
  listeners = {}

  addListener(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)
  }
}

let customEventEmitter,
    expectedResult,
    result

const fn1 = () => console.log('fn1 invoked')
customEventEmitter = new CustomEventEmitter()
customEventEmitter.addListener('event1', fn1)
result = customEventEmitter.listeners
expectedResult = { 'event1': [fn1] }
assert.deepEqual(result, expectedResult)

customEventEmitter.addListener('event1', fn1)
result = customEventEmitter.listeners
expectedResult = { 'event1': [fn1, fn1] }
assert.deepEqual(result, expectedResult)

console.log('done')

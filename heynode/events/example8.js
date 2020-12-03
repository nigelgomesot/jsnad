
const assert = require('assert')

class CustomEventEmitter {
  listeners = {}

  addListener(event, fn) {
    this.listeners[event] = this.listeners[event] || []
    this.listeners[event].push(fn)

    return this
  }

  on(event, fn) {
    return this.addListener(event, fn)
  }

  removeListener(event, fn) {
    const eventListeners = this.listeners[event]

    if (!eventListeners)
      return this

    for (let i = 0; i < eventListeners.length; i++) {
      if (eventListeners[i] === fn) {
        eventListeners.splice(i, 1)
        break
      }
    }

    return this
  }

  off(event, fn) {
    return this.removeListener(event, fn)
  }

  once(event, fn) {
    this.listeners[event] = this.listeners[event] || []

    const onceWrapper = () => {
      fn()
      this.off(event, onceWrapper)
    }
    this.listeners[event].push(onceWrapper)

    return this
  }
}

let customEventEmitter,
    expectedResult,
    result

// test on
const fn1 = () => console.log('fn1 invoked')
customEventEmitter = new CustomEventEmitter()
customEventEmitter.on('event1', fn1)
result = customEventEmitter.listeners
expectedResult = { 'event1': [fn1] }
assert.deepEqual(result, expectedResult)

customEventEmitter.on('event1', fn1)
result = customEventEmitter.listeners
expectedResult = { 'event1': [fn1, fn1] }
assert.deepEqual(result, expectedResult)

// test off
const fn2 = () => console.log('fn2 invoked')
customEventEmitter.on('event2', fn2)
result = customEventEmitter.listeners
expectedResult = { 'event1': [fn1, fn1], 'event2': [fn2] }
assert.deepEqual(result, expectedResult)
customEventEmitter.off('event1', fn1)
result = customEventEmitter.listeners
expectedResult = { 'event1': [fn1], 'event2': [fn2] }
assert.deepEqual(result, expectedResult)

customEventEmitter.off('event1', fn1)
result = customEventEmitter.listeners
expectedResult = { 'event1': [], 'event2': [fn2] }
assert.deepEqual(result, expectedResult)

customEventEmitter.off('event1', fn1)
result = customEventEmitter.listeners
expectedResult = { 'event1': [], 'event2': [fn2] }
assert.deepEqual(result, expectedResult)


// test once
const fn3 = () => console.log('fn3.invoked')
customEventEmitter.once('event3', fn3)
assert.equal(customEventEmitter.listeners['event3'].length, 1)
customEventEmitter.once('event3', fn3)
assert.equal(customEventEmitter.listeners['event3'].length, 2)

console.log('done')

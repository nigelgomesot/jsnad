
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

  emit(event, ...args) {
    const fns = this.listeners[event]

    if (!fns) return false

    fns.forEach(fn => fn(...args))

    return true
  }

  listenerCount(event) {
    const fns = this.listeners[event] || []

    return fns.length
  }

  rawListeners(event) {
    return this.listeners[event]
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


// test emit
customEventEmitter = new CustomEventEmitter()

result = []
const fnEmit1 = () => result.push('fnEmit1 invoked')
customEventEmitter.on('fnEmit1', fnEmit1)
customEventEmitter.emit('fnEmit1')
expectedResult = ['fnEmit1 invoked']
assert.deepEqual(result, expectedResult)

result = []
const fnEmit2 = () => result.push('fnEmit2 invoked')
customEventEmitter.on('fnEmit2', fnEmit2)
customEventEmitter.on('fnEmit2', fnEmit2)
customEventEmitter.emit('fnEmit2')
expectedResult = ['fnEmit2 invoked', 'fnEmit2 invoked']
assert.deepEqual(result, expectedResult)

//test listenerCount
customEventEmitter = new CustomEventEmitter()

assert.equal(customEventEmitter.listenerCount('fnListner1'), 0)

const fnListner1 = () => null
customEventEmitter.on('fnListner1', fnListner1)
assert.equal(customEventEmitter.listenerCount('fnListner1'), 1)

customEventEmitter.on('fnListner1', fnListner1)
assert.equal(customEventEmitter.listenerCount('fnListner1'), 2)



// test rawListeners
customEventEmitter = new CustomEventEmitter()
assert.equal(customEventEmitter.rawListeners('fnRawListner1'), undefined)

const fnRawListner1 = () => null
customEventEmitter.on('fnRawListner1', fnRawListner1)
assert.deepEqual(customEventEmitter.rawListeners('fnRawListner1'), [fnRawListner1])

const fnRawListner2 = () => null
customEventEmitter.on('fnRawListner2', fnRawListner2)
customEventEmitter.on('fnRawListner2', fnRawListner2)
assert.deepEqual(customEventEmitter.rawListeners('fnRawListner2'), [fnRawListner2, fnRawListner2])

// PENDING: TEST once (when added multiple times)

console.log('done')

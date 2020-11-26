
// REF: https://www.freecodecamp.org/news/how-to-code-your-own-event-emitter-in-node-js-a-step-by-step-guide-e13b7e7908e1/

// callback invocation
const EventEmitter = require('events')
const myEmitter = new EventEmitter()

const cb1 = () => console.log('cb1 invoked')
const cb2 = () => console.log('cb2 invoked')

myEmitter.on('event1', cb1)
myEmitter.on('event1', cb2)

myEmitter.emit('event1')

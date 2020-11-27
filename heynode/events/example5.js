// listener count

const EventEmitter = require('events')
const myEmitter = new EventEmitter()

const cb1 = () => console.log('cb1 invoked')
const cb2 = () => console.log('cb2 invoked')
const cb3 = () => console.log('cb3 invoked')

myEmitter.on('event', cb1)
myEmitter.on('event', cb2)
myEmitter.on('event', cb3)

myEmitter.off('event', cb2)

myEmitter.emit('event')
myEmitter.emit('event')
myEmitter.emit('event')

console.log(myEmitter.listenerCount('event'))

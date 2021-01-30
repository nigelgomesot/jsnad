// getting raw listeners

const EventEmitter = require('events')
const myEmitter = new EventEmitter()

const cb1 = () => console.log('cb1 invoked')
const cb2 = () => console.log('cb2 invoked')
const cb11 = () => console.log('cb11 invoked')

myEmitter.on('event1', cb1)
myEmitter.on('event2', cb2)
myEmitter.on('event1', cb11)

//myEmitter.emit('event1')

console.log(myEmitter.rawListeners('event1'))

// unregistering events

const EventEmitter = require('events')

const myEmitter = new EventEmitter()

const cb = () => console.log('cb invoked')

myEmitter.on('event', cb)
myEmitter.off('event', cb)

myEmitter.emit('event')
myEmitter.emit('event')

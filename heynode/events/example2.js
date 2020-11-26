// emitting once
const EventEmitter = require('events')

const myEmitter = new EventEmitter()

myEmitter.once('emitOnce', () => console.log('emit once.'))

myEmitter.emit('emitOnce')
myEmitter.emit('emitOnce')

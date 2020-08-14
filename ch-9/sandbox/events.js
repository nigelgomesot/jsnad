const { EventEmitter } = require('events')

// On
const e1 = new EventEmitter()
e1.on('close', () => console.log('e1 close event emitted.'))
e1.emit('close')

// Add Listener
const e2 = new EventEmitter()
e2.addListener('close', () => console.log('e2 close event emitted.'))
e2.emit('close')

// Arguments
const e3 = new EventEmitter()
e3.on('add', (a, b) => console.log(`e3 added = ${a + b}`))
e3.emit('add', 1, 2)

// Emit before close does not fire.
const e4 = new EventEmitter()
e4.emit('close')
e4.on('close', () => console.log('e4 close event emitted.'))

// Ordering
const e5 = new EventEmitter()
e5.on('e5-event', () => console.log('e5 emitted first'))
e5.on('e5-event', () => console.log('e5 emitted second'))
e5.emit('e5-event')

// Prepend
const e6 = new EventEmitter()
e6.on('e6-event', () => console.log('e6 emitted second'))
e6.prependListener('e6-event', () => console.log('e6 emitted first'))
e6.emit('e6-event')

// multiple emits
const e7 = new EventEmitter()
e7.on('e7-event', () => console.log('e7 emitted'))
e7.emit('e7-event')
e7.emit('e7-event')
e7.emit('e7-event')

// emit `once`
const e8 = new EventEmitter()
e8.once('e8-event', () => console.log('e8 emitted once'))
e8.emit('e8-event')
e8.emit('e8-event')
e8.emit('e8-event')

// removeListener
const e9 = new EventEmitter()
const e9ListenerFn1 = () => console.log('e9ListenerFn1 emitted')
const e9ListenerFn2 = () => console.log('e9ListenerFn2 emitted')
e9.on('e9-event', e9ListenerFn1)
e9.on('e9-event', e9ListenerFn2)
// setInterval(() => e9.emit('e9-event'), 200);
// setTimeout(() => e9.removeListener('e9-event', e9ListenerFn1), 500)
// setTimeout(() => e9.removeListener('e9-event', e9ListenerFn2), 1100)

// removeAllListeners
const e10 = new EventEmitter()
const e10ListenerFnA1 = () => console.log('e10ListenerFnA1')
const e10ListenerFnA2 = () => console.log('e10ListenerFnA2')
const e10ListenerFnB1 = () => console.log('e10ListenerFnB1')
e10.on('e10-a-event', e10ListenerFnA1)
e10.on('e10-a-event', e10ListenerFnA2)
e10.on('e10-b-event', e10ListenerFnB1)
// setInterval(() => {
//   e10.emit('e10-a-event')
//   e10.emit('e10-b-event')
// }, 200)
// setTimeout(() => e10.removeAllListeners('e10-a-event'), 500)
// setTimeout(() => e10.removeAllListeners(), 1100)


// error
// const e11 = new EventEmitter()
// e11.emit('error', new Error('test error'))

const e12 = new EventEmitter()
e12.on('error', (err) => console.warn(err.message))
e12.emit('error', new Error('test error'))

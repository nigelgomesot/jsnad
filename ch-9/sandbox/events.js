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


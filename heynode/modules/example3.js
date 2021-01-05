
// require gets cached by first require statement
const message1 = require('./example3/')
console.log('message1', message1)

const message2 = require('./example3/')
console.log('message2', message2)

// REF: https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/#the-fork-function

// basic fork example
const { fork } = require('child_process')

const forked = fork('example10_child.js')

forked.on('message', message => console.log('message from child process:', message))

forked.send({'hello': 'world'})

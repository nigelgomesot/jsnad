process.on('message', message => console.log('message from parent process:', message))

let counter = 0
setInterval(() => {
  process.send({counter: counter++})
}, 1000)

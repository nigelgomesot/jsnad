// REF: https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/

const { spawn } = require('child_process')

// basic example
const run1 = () => {
  const child = spawn('pwd')

  child.on('exit', (code, signal) => console.log(`code: ${code}, signal: ${signal}`))
}
//run1()

// child stdio stream (stdout)
const run2 = () => {
  const child = spawn('find', ['.', '-type', 'f'])

  child.stdout.on('data', data => console.log('child data:', data.toString()))
  child.stderr.on('data', data => console.log('child error data:', data.toString()))
}
//run2()

// child stdio stream (stderr)
const run3 = () => {
  const child = spawn('find', ['.', '-type', 'x'])

  child.stdout.on('data', data => console.log('child data:', data.toString()))
  child.stderr.on('data', data => console.log('child error data:', data.toString()))
}
run3()

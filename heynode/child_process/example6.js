const { spawn } = require('child_process')

// pipe parent process into child process
const run1 = () => {
  const child = spawn('wc')

  process.stdin.pipe(child.stdin)

  child.stdout.on('data', data => { console.log(`child stdout data: ${data}`) })
}
//run1()

// pipe multiple processes
const run2 = () => {
  const find = spawn('find', ['.', '-type', 'f'])
  const wc = spawn('wc', ['-l'])

  find.stdout.pipe(wc.stdin)

  wc.stdout.on('data', data => { console.log(`wc data: ${data}`)})
}
run2()

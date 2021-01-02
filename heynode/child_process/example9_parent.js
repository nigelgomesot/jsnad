const { spawn } = require('child_process')

// detaching child process
const child = spawn('node', ['example9_child.js'], {
  detached: true,
  stdio: 'ignore'
})

child.unref()
console.log('parent process done.')

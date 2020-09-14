'use strict'

const { spawn } = require('child_process')

// Basic
const run1  = () => {
  const sp = spawn(
    process.execPath,
    ['-e', `console.log('subprocess stdio output')`]
  )

  console.log('subprocess PID:', sp.pid)
  sp.stdout.pipe(process.stdout)

  sp.on('close', status => console.log('subprocess exit status:', status))
}
// run1()

// Subprocess errors
const run2 = () => {
  const sp = spawn(
    process.execPath,
    ['-e', `procss.exit(1)`]
  )

  console.log('subprocess PID:', sp.pid)
  sp.stdout.pipe(process.stdout)

  sp.on('close', status => console.log('subprocess exit status:', status))
}
run2()

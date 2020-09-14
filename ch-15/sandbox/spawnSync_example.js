'use strict'

const { spawnSync } = require('child_process')

// Basic
const run1 = () => {
  const result = spawnSync(
    process.execPath,
    ['-e', `console.log('subprocess stdio output')`]
  )

  console.dir(result)
}
// run1()

const run2 = () => {
  const result = spawnSync(
    process.execPath,
    ['-e', `console.log('subprocess stdio output')`]
  )

  console.log(result.stdout.toString())
}
// run2()

// Subprocess errors
const run3 = () => {
  const result = spawnSync(
    process.execPath,
    ['-e', 'process.exit(1)']
  )

  console.dir(result)
}
// run3()

const run4 = () => {
  const result = spawnSync(
    process.execPath,
    ['-e', `throw Error('Monkey')`]
  )

  console.dir(result)
}
run4()

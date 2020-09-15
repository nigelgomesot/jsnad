'use strict'

const { spawn } = require('child_process')

// Accessing parent ENV in child process
const run1 = () => {
  process.env.TEST_VAR_1 = 'TEST VAR ONE'

  const sp = spawn(
    process.execPath,
    ["-p", "process.env"]
  )

  sp.stdout.pipe(process.stdout)
}
// run1()

// Overwriting parent ENV in child process
const run2 = () => {
  process.env.TEST_VAR_1 = 'TEST VAR ONE'

  const sp = spawn(
    process.execPath,
    ["-p", "process.env"],
    { env: {TEST_VAR_2: 'TEST VAR TWO'} }
  )

  sp.stdout.pipe(process.stdout)
}
run2()


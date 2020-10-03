'use strict'

const { spawn, spawnSync } = require('child_process')

// default stdio with pipe
const run1 = () => {
  const sp = spawn(
    process.execPath,
    [
      '-e',
      `console.error('error output'); process.stdin.pipe(process.stdout);`
    ],
    { stdio: ['pipe', 'pipe', 'pipe'] }
  )

  sp.stdout.pipe(process.stdout)
  sp.stderr.pipe(process.stdout)
  sp.stdin.write('test input becomes output \n\n')
  sp.stdin.end()
}
// run1()

// stdio inherit
const run2 = () => {
  const sp = spawn(
    process.execPath,
    [
      '-e',
      `console.error('error output'); process.stdin.pipe(process.stdout);`
    ],
    { stdio: ['pipe', 'inherit', 'pipe'] }
  )

  sp.stderr.pipe(process.stdout)
  sp.stdin.write('test input becomes output \n\n')
  sp.stdin.end()
}
// run2()

// stdio pass writable stream
const run3 = () => {
  const sp = spawn(
    process.execPath,
    [
      '-e',
      `console.error('error output'); process.stdin.pipe(process.stdout);`
    ],
    { stdio: ['pipe', 'inherit', process.stdout] }
  )

  sp.stdin.write('test input becomes output \n\n')
  sp.stdin.end()
}
// run3()

// stdio ignore output
const run4 = () => {
  const sp = spawn(
    process.execPath,
    [
      '-e',
      `console.error('error output'); process.stdin.pipe(process.stdout);`
    ],
    { stdio: ['pipe', 'inherit', 'ignore'] }
  )

  sp.stdin.write('test input becomes output \n\n')
  sp.stdin.end()
}
// run4()

// end input to child process
const run5 = () => {
  spawnSync(
    process.execPath,
    [
      '-e',
      `console.error('error output'); process.stdin.pipe(process.stdout)`
    ],
    {
      input: 'This input from parent process becomes output of child process \n\n',
      stdio: ['pipe', 'inherit', 'ignore']
    }
  )
}
run5()

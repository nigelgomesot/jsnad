'use strict'

const { execSync } = require('child_process')


// execute node based commands

const nodeCmds = () => {
  const output1 = execSync(
    `node -e "console.log('subprocess stdio output')"`
  )
  console.log(output1.toString())

  const output2 = execSync(
    `node -p "'subprocess stdio output'"`
  )
  console.log(output2.toString())

  const output3 = execSync(
    `node -e "console.error('subprocess stderror output')"`
  )
  console.log(output3.toString())
}
// nodeCmds()


// execute platform specific commands
const listDir = () => {
  const cmd = process.platform === 'win32' ? 'dir' : 'ls'
  const out = execSync(cmd)
  console.log(out.toString())
}
// listDir()


// execute same node binary as current process
const nodeBinary = () => {
  const out = execSync(
    `${process.execPath} -e "console.log('subprocess stdio output via (${process.execPath})')"`
  )
  console.log(out.toString())
}
// nodeBinary()

// handle subprocess exit code != 0
const subprocessErrorExitCode = () => {
  try {
    execSync(`${process.execPath} -e "process.exit(1)"`)
  } catch (err) {
    console.warn(`subprocess error:`, err.message)
  }
}
// subprocessErrorExitCode()

const subprocessError = () => {
  try {
    execSync(`${process.execPath} -e "throw Error('Monkey')"`)
  } catch (err) {
    console.warn(`\n\n\n subprocess error:`, err)
  }
}
subprocessError()

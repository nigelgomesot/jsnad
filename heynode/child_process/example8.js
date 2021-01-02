const { spawn } = require('child_process')

// spawn with shell syntax
const run1 = () => {
  const child = spawn('find . -type f | wc -l', {
    stdio: 'inherit',
    shell: true
  })
}
//run1()

// spwan with cwd option
const run2 = () => {
  const child = spawn('find . -type f | wc -l', {
    stdio: 'inherit',
    shell: true,
    cwd: '/Users/nigelgomes/Downloads'
  })
}
//run2()

// spawn with default parent env exposed
const run3 = () => {
  const child = spawn('echo $HOME', {
    stdio: 'inherit',
    shell: true
  })
}
//run3()

// spawn with parent env hidden
const run4 = () => {
  const child = spawn('echo $HOME', {
    stdio: 'inherit',
    shell: true,
    env: {}
  })
}
//run4()

// spawn with parent env overridden
const run5 = () => {
  const child = spawn('echo $ANSWER', {
    stdio: 'inherit',
    shell: true,
    env: { 'ANSWER': 42 }
  })
}
run5()

// REF: https://nodejs.org/en/knowledge/getting-started/the-process-module/

const fs = require("fs")
const readline = require('readline')

// process events

// exit event
const run1 = () => {
  process.on('exit', () => console.log('gracefull exit.'))
}
//run1()

//uncaughtException event
const run2 = () => {
  process.on('uncaughtException', err => {
    console.log('uncaughtException occurred:', err.message)
  })

  fs.readFile('nonExistentFile', null, (err,data) => {
    if (err)
      throw new Error('non existent file error')
  })
}
//run2()


// process streams
// stdio
const run3 = () => {
  process.stdout.write("stdout message \n")
}
//srun3()

// stderr
const run4 = () => {
  process.stderr.write("stderr message \n")
}
//run4()

// stdin
// REF: https://nodejs.org/en/knowledge/command-line/how-to-prompt-for-command-line-input/
const run5 = () => {
  process.stderr.write("stderr message \n")
}
//run5()

const run6 = () => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  })

  rl.on('close', () => {
    console.log('rl closed.')
  })

  rl.question('enter letter: ', letter => {
    rl.question('enter number: ', number => {
      console.log(`entered letter: ${letter}, number: ${number}`)
      rl.close()
    })
  })
}
run6()

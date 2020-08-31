'use strict'

const { join } = require('path')

// Synchronous
const sync = () => {
  const { readFileSync } = require('fs')
  let contents

  // Reading file synchronously
  contents = readFileSync(__filename)
  console.log(contents)

  contents = readFileSync(__filename, { encoding: 'utf8' })
  console.log(contents)

  // Writing file synchronously
  const { writeFileSync } = require('fs')

  contents = readFileSync(__filename, { encoding: 'utf8' })
  const outFile1 = join(__dirname, 'out.txt')
  writeFileSync(outFile1, contents.toUpperCase())

  // append
  contents = readFileSync(__filename, { encoding: 'utf8' })
  writeFileSync(outFile1, contents.toUpperCase(), {
    flag: 'a'
  })
}
// sync();

// Callbacks
const cb = () => {
  const { readFile, writeFile } = require('fs')
  const { join } = require('path')

  readFile(__filename, {encoding: 'utf8'}, (err, contents) => {
    if (err) {
      console.warn(`read error occurred: ${err.message}`)
      return
    }

    const outFile = join(__dirname, 'out.txt')
    writeFile(outFile, contents.toUpperCase(), err => {
      if (err) {
        console.warn(`write error occurred: ${err.message}`)
        return
      }

      console.log('write completed.')
    })
  })
}
cb()

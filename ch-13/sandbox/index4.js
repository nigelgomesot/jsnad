'use strict'

// Streams

// Basic Pipeline
const run = () => {
  const { join } = require('path')
  const { pipeline } = require('stream')
  const { createReadStream, createWriteStream } = require('fs')
  pipeline(
    createReadStream(__filename),
    createWriteStream(join(__dirname, 'out.txt')),
    err => {
      if (err) {
        console.warn(`error occurred: ${err.message}`)
        return
      }

      console.log('completed.')
    }
  )
}
//run()


// With Transform
const runWithTransform = () => {
  const { join } = require('path')
  const { pipeline } = require('stream')
  const { createReadStream, createWriteStream } = require('fs')
  const { Transform } = require('stream')

  const createUpperCaseStream = () => {
    return new Transform({
      transform(chunk, enc, next) {
        const uppercased = chunk.toString().toUpperCase()
        // const err = new Error('custom error')
        // next(err)
        next(null, uppercased)
      }
    })
  }

  pipeline(
    createReadStream(__filename),
    createUpperCaseStream(),
    createWriteStream(join(__dirname, 'out.txt')),
    err => {
      if (err) {
        console.warn(`error occurred: ${err.message}`)
        return
      }

      console.log('completed.')
    }
  )
}
runWithTransform()

'use strict'

const stream = require('stream')

let result

// result = stream + ''
// result = stream.prototype
// result = Object.getPrototypeOf(stream.prototype)

console.log(result)


// Readable Streams
const fs = require('fs')

const run1 = () => {
  const readable = fs.createReadStream(__filename)
readable.on('data', (data) => console.log('Reading data:',data))
readable.on('end', () => console.log(`Finished reading data.`))
}
//run1()

const { Readable } = require('stream')

// createReadStream Via Encoding
const createReadStreamViaEncoding = () => {
  const data = ['this', 'is', 'test', 'text']

  return new Readable({
    encoding: 'base64',
    read() {
      if (data.length === 0) this.push(null)
      else this.push(data.shift())
    }
  })
}
const run2 = () => {
  const readable = createReadStreamViaEncoding()
  readable.on('data', (data) => console.log('Reading data:', data))
  readable.on('end', () => console.log('Finished Reading data.'))
}
//run2()

// createReadStream Via objectMode=false
const createReadStreamViaobjectMode = () => {
  const data = ['this', 'is', 'test', 'text']

  return new Readable({
    objectMode: true,
    read() {
      if (data.length === 0) this.push(null)
      else this.push(data.shift())
    }
  })
}
const run3 = () => {
  const readable = createReadStreamViaobjectMode()
  readable.on('data', (data) => console.log('Reading data:', data))
  readable.on('end', () => console.log('Finished Reading data.'))
}
//run3()

// Readable.from
const run4 = () => {
  const data = ['this', 'is', 'test', 'text', '.']
  const readable = Readable.from(data)

  readable.on('data', (data) => console.log('Reading data:', data))
  readable.on('end', () => console.log('Finished Reading data.'))
}
run4()

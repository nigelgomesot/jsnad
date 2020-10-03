'use strict'

const fs = require('fs')

function run1() {
  const writable = fs.createWriteStream('./out')
  writable.on('finish', () => console.log('writing finished.'))
  writable.write('A\n')
  writable.write('B\n')
  writable.write('C\n')
  writable.end('end of text.')
}
//run1()

const { Writable} = require('stream')

// Custom Writable
const createWriteStream1 = (data) => {
  return new Writable({
    decodeStrings: false,
    write(chunk, enc, next) {
      data.push(chunk)
      next()
    }
  })
}
function run2() {
  const data = []
  const writable = createWriteStream1(data)
  writable.on('finish', () => console.log('writing finished:', data))
  writable.write('A\n')
  writable.write('B\n')
  writable.write('C\n')
  writable.end('end of text.')
}
//run2()

// Custom Writable with ObjectMode
const createWriteStream2 = (data) => {
  return new Writable({
    objectMode: true,
    write(chunk, enc, next) {
      data.push(chunk)
      next()
    }
  })
}
function run3() {
  const data = []
  const writable = createWriteStream2(data)
  writable.on('finish', () => console.log('writting finished:', data))
  writable.write('A\n')
  writable.write(1)
  writable.write(true)
  writable.end('end of text.')
}
run3()

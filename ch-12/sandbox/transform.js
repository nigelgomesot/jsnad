'use strict'


// Basic Transform
function run1() {
  const { createGzip } = require('zlib')

  const transform = createGzip()

  transform.on('data', data => console.log(`Received data: ${data.toString('base64')}`))

  transform.write('first')

  setTimeout(() => {

    transform.end('second')
  }, 500)
}
//run1()

// Custom Transform
const { Transform } = require('stream')
const { scrypt } = require('crypto')

const createTransformStream = () => {
  return new Transform({
    decodeStrings: false,
    encoding: 'hex',
    transform(chunk, enc, next) {
      scrypt(chunk, 'a-salt', 32, (err, key) => {
        if (err)
          next(err)
        else
          next(null, key)
      })
    }
  })
}

function run2() {
  const transformer = createTransformStream()

  transformer.on('data', data => {
    console.log(`Received data: ${data}`)
  })

  transformer.write('A\n')
  transformer.write('B\n')
  transformer.write('C\n')
  transformer.end('End of text.\n')
}
run2()

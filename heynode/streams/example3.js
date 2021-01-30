// Pipeline

const { PassThrough, pipeline } = require('stream')
const fs = require('fs')

const input = fs.createReadStream('example3.html')
const output = fs.createWriteStream('example3.html.out')
const passThrough = new PassThrough()

pipeline(input, passThrough, output, err => {
  if (err) console.warn('pipeline error occurred:', err)
  else console.log('pipeline ended')
})

passThrough.emit('error', new Error('Custom Error'))

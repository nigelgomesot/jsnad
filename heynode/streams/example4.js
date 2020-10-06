// Transform

const { Transform, pipeline } = require('stream')

const upperCaseTransform = new Transform({
  transform: (chunk, enc, cb) => {
    cb(null, chunk.toString().toUpperCase())
  }
})

pipeline(process.stdin, upperCaseTransform, process.stdout, err => {
  if (err) console.warn('pipeline error occurred:', err)
  else console.log('pipeline ended')
})

'use strict'

console.log('initialized')

// process.stdin.pipe(process.stdout)

//console.log(process.stdin.isTTY ? 'terminal:' : 'piped to:')

//process.stderr.write(process.stdin.isTTY ? 'terminal:\n': 'piped to:\n')
console.error(process.stdin.isTTY ? 'terminal:': 'piped to:')

const { Transform } = require('stream')

const createUppercaseStream = () => {
  return new Transform({
    transform(chunk, enc, next) {
      const uppercased = chunk.toString().toUpperCase()

      next(null, uppercased)
    }
  })
}

const uppercased = createUppercaseStream()

process.stdin.pipe(uppercased).pipe(process.stdout)

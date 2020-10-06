// REF: https://heynode.com/tutorial/what-stream

// Basic fs read & write stream

const fs = require('fs')

const write = () => {
  const outputStream = fs.createWriteStream('example1.txt', { flags: 'a' })
  process.stdin.pipe(outputStream)
}
//write()

const read = () => {
  const inputStream = fs.createReadStream('example1.txt')
  inputStream.pipe(process.stdout)
}
read()

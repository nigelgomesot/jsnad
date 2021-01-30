const fs = require('fs')


// read async
const readAsync = () => {
  console.log('readAsync')

  fs.readFile('example1.out1', (err, data) => console.log('read async data', data))
  console.log('read async done')
}
//readAsync()

// read sync
const readSync = () => {
  console.log('readSync')

  const data = fs.readFileSync('example1.out1')
  console.log('read sync data', data)
  console.log('read sync done')
}
readSync()

const { promisify } = require('util')
const { readFile } = require('fs')

// simple promise example
function simplePromise() {
  const promise = new Promise((resolve, reject) => {
    readFile(__filename, (err, contents) => {
      if (err) reject(err)
      else resolve(contents.toString().length)
    })
  })

  promise
    .then(console.log)
    .catch(console.error)
}
//simplePromise()

// promisify example
function promisify1() {
  const readFileProm = promisify(readFile)
  const promise = readFileProm(__filename)
  promise
    .then(contents => console.log(contents.toString().length))
    .catch(err => console.error(err))
}
//promisify1()

// chaining example
function promisify2() {
  const readFileProm = promisify(readFile)
  readFileProm(__filename)
    .then(contents => contents.toString())
    .then(stringifiedContents => stringifiedContents.length)
    .then(console.log)
    .catch(console.error)
}
//promisify2()

console.log('done.')

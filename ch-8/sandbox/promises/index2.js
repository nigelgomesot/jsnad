const { readFile } = require('fs').promises

const files = [
  './data/small.html',
  './data/medium.html',
  './data/big.html'
]

const printLength = (contents) => {
  console.log(contents.toString().length)
}

const getLength = (contents) => {
  return contents.toString().length
}

function staticFileRead() {
  const smallFile = files[0],
        mediumFile = files[1],
        bigFile = files[2];

  readFile(bigFile)
    .then(bigFileContents => {
      printLength(bigFileContents)

      return readFile(mediumFile)
    })
    .then(mediumFileContents => {
      printLength(mediumFileContents)

      return readFile(smallFile)
    })
    .then(printLength)
    .catch(console.error)
}
//staticFileRead()

const variableFileRead = () => {
  const data = []

  recursiveRead(files, 0, data)
  .then(console.log)
  .catch(console.error)
}
const recursiveRead = (files, index, data) => {
  const file = files[index]

  return readFile(file)
          .then(contents => {
            data.push(getLength(contents))

            index++
            if (index < files.length) return recursiveRead(files, index, data)
            else return data
          })
}
//variableFileRead()

// Promise.all
promiseAll = (files) => {
  const readers = files.map(file => readFile(file))

  Promise.all(readers)
    .then(fileContents => {
      fileContents.forEach(printLength)
    })
    .catch(console.error)
}
//promiseAll(files)

// Promie.allSettled
getAllSettledLengths = (results) => {
  results.filter(({status}) => status === 'rejected')
    .forEach(({reason}) => console.error(reason))

  return results.filter(({status}) => status === 'fulfilled')
                  .map(({value}) => getLength(value))
}
promiseAllSettled = (files) => {
  const readers = files.map(file => readFile(file))

  Promise.allSettled(readers)
    .then(getAllSettledLengths)
    .then(console.dir)
}
//promiseAllSettled(files)

//Independent handling
readFile(files[2]).then(printLength).catch(console.error)
readFile(files[1]).then(printLength).catch(console.error)
readFile(files[0]).then(printLength).catch(console.error)

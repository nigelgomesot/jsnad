const { readFile } = require('fs').promises;


// simple example
async function run() {
  const contents = await readFile(__filename)
  return contents.toString()
}
// run()
//   .then(console.log)
//   .catch(console.error)

const bigFile = './data/big.html',
      mediumFile = './data/medium.html',
      smallFile = './data/small.html'

const printLength = (contents) => {
  console.log(contents.toString().length)
}

const getLength = (contents) => {
  return contents.toString().length
}

async function runSequentialStaticFiles() {
  printLength(await readFile(bigFile))
  printLength(await readFile(mediumFile))
  printLength(await readFile(smallFile))
}
// runSequentialStaticFiles()
//   .catch(console.error)

const files = [bigFile, mediumFile, smallFile]
async function runSequentialVariableFiles(files) {
  const data = []
  for (file of files) {
    const fileContent = await readFile(file)
    data.push(getLength(fileContent))
  }

  return data
}
// runSequentialVariableFiles(files)
//   .then(console.log)
//   .catch(console.error)

async function runPromiseAllVariableFiles(files) {
  const readers = files.map(file => readFile(file))

  const contents = await Promise.all(readers)

  return contents.map(getLength)
}
// runPromiseAllVariableFiles(files)
//   .then(console.log)
//   .catch(console.error)

async function runPromiseAllSettled(files) {
  const readers = files.map(file => readFile(file))
  const results = await Promise.allSettled(readers);

  results
    .filter(({status}) => status === 'rejected')
    .forEach(({reason}) => console.warn(reason))

  const data = results
                .filter(({status}) => status === 'fulfilled')
                .map(({value}) => getLength(value))

  console.log(data)
}
// runPromiseAllSettled(files)

async function runParallelExecution() {
  const readSmallFile = readFile(smallFile)
  const readMediumFile = readFile(mediumFile)
  const readBigFile = readFile(bigFile)

  readBigFile.then(printLength)
  readMediumFile.then(printLength)
  readSmallFile.then(printLength)

  await readBigFile
  await readMediumFile
  await readSmallFile
}
// runParallelExecution()
//   .catch(console.error)

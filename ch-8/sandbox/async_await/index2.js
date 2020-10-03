const { readFile } = require('fs');
const { promisify } = require('util')

const bigFile = './data/big.html',
      mediumFile = './data/medium.html',
      smallFile = './data/small.html'

const getLength = (contents) => {
  return contents.toString().length
}

// async/await wiith promise & callbacks
const read = promisify(cb => {
  let index = 0;

  const print = (err, contents) => {
    index++
    if (err) {
      console.error(err)
      if (index === 3) cb()
      return
    }

    console.log(getLength(contents))
    if (index === 3) cb()
  }

  readFile(bigFile, print)
  readFile(mediumFile, print)
  readFile(smallFile, print)
})

async function readAllFilesImplicitCB() {
  console.log('started.')
  await read()
  console.log('resumed after await.')
  console.log('>>>>> implicit callback completed.')
}
//readAllFilesImplicitCB()

function explicitCallBack() {
  console.log("<<<<< explicit callback completed.")
}
async function readAllFilesExplicitCB() {
  console.log('started.')
  await read(explicitCallBack)
  console.log('resumed after await.')
  console.log('>>>>> implicit callback completed.')
}
readAllFilesExplicitCB()

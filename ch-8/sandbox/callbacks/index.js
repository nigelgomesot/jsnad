const { readFile} = require('fs')

// readFile(__filename, (err, contents) => {
//   if (err) console.error(err)

//   console.log(contents.toString().length)
// })

const printLength = (err, contents) => {
  if (err)
    return console.error(err)

  console.log(contents.toString().length)
}

const getLength = (err, contents) => {
  if (err)
    return console.error(err)

  return contents.toString().length
}

const smallFile = './data/small.html',
      mediumFile = './data/medium.html',
      bigFile = './data/big.html';

// Out of order
// readFile(bigFile, printLength)
// readFile(mediumFile, printLength)
// readFile(smallFile, printLength)

// // In order
// readFile(bigFile, (err, contents) => {
//   console.log('processing bigFile...')

//   printLength(err, contents)

//   readFile(mediumFile, (err, contents) => {
//     console.log('processing mediumFile...')

//     printLength(err, contents)

//     readFile(smallFile, (err, contents) => {
//       console.log('processing smallFile...')

//       printLength(err, contents)
//     })
//   })
// })

// return when all are loaded
const data = []
readFile(bigFile, (err, contents) => {
  console.log('processing bigFile...')

  if (err) console.error(err)
  else data.push(getLength(err, contents))

  readFile(mediumFile, (err, contents) => {
    console.log('processing mediumFile...')

    if (err) console.error(err)
    else data.push(getLength(err, contents))

    readFile(smallFile, (err, contents) => {
      console.log('processing smallFile...')

      if (err) console.error(err)
      else data.push(getLength(err, contents))

      console.log('data', data)
    })
  })
})

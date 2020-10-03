const { readFile} = require('fs')
const series = require('fastseries')()

// readFile(__filename, (err, contents) => {
//   if (err) console.error(err)

//   console.log(contents.toString().length)
// })

const printLength = (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  console.log(Buffer.concat(data).toString().length)
}

const getLength = (err, data) => {
  if (err)
    return console.error(err)

  return data.toString().length
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

// // return when all are loaded
// const data = []
// readFile(bigFile, (err, contents) => {
//   console.log('processing bigFile...')

//   if (err) console.error(err)
//   else data.push(getLength(err, contents))

//   readFile(mediumFile, (err, contents) => {
//     console.log('processing mediumFile...')

//     if (err) console.error(err)
//     else data.push(getLength(err, contents))

//     readFile(smallFile, (err, contents) => {
//       console.log('processing smallFile...')

//       if (err) console.error(err)
//       else data.push(getLength(err, contents))

//       console.log('data', data)
//     })
//   })
// })

// // read variable number of files
// const files = [smallFile, mediumFile, bigFile]
// const data = []
// let index = 0
// const readRecursive = fileIndex => {
//   const file = files[fileIndex]
//   console.log(`processing ${file}...`)
//   readFile(file, (err, contents) => {
//     if (err) console.warn(`error: ${file} ${err}`)
//     else data.push([file, contents.toString().length])
//     index++
//     if (index < files.length) readRecursive(index)
//     else console.log(`data: ${data}`)
//   })
// }
// readRecursive(index)

// using fastseries with halt
const files = [smallFile, mediumFile, bigFile]
const readers = files.map(file => {
  return (_, cb) => {
    readFile(file, (err, contents) => {
      console.log(`reading file ${file}`)
      if (err) {
        console.warn(err)
        cb(null, Buffer.alloc(0))
      }
      else cb(null, contents)
    })
  }
})
series(null, readers, null, printLength)


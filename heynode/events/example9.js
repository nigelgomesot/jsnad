// REF: https://medium.com/developers-arena/nodejs-event-emitters-for-beginners-and-for-experts-591e3368fdd2

const { createReadStream } = require('fs')

let chunkIndex = 0
const readStream = createReadStream('./example9.txt')

readStream.on('open', () => console.log('Reading opened'))

readStream.on('end', () => console.log('Reading ended'))

readStream.on('data', chunk => {
  console.log('Chunk Index: ', ++chunkIndex)
  console.log(chunk)
  console.log('\n')
})

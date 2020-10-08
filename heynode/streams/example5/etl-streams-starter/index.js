// REF: https://heynode.com/tutorial/use-streams-extract-transform-and-load-csv-data

const fs = require('fs')
const csv = require('csvtojson')
const { Transform, pipeline } = require('stream')

const inputStream = fs.createReadStream('data/planetRaw.csv')
const outputStream = fs.createWriteStream('data/planetOut.ndjson')

const csvParser = csv()

const transformPlanetStream = new Transform({
  transform: (planet, enc, cb) => {
    try {
      const planetObject = JSON.parse(planet)
      const { pl_hostname, pl_letter } = planetObject
      const planetMiniObject = { pl_hostname, pl_letter }
      const planetMiniString = JSON.stringify(planetMiniObject) + '\n'
      // throw Error('Custom Error')

      cb(null, planetMiniString)
    } catch (err) {
      console.warn('transform error occurred:', err.message)
      cb(err)
    }
  }
})

// inputStream
//   .pipe(csvParser)
//   .pipe(transformPlanetStream)
//   .pipe(outputStream)

pipeline(
  inputStream,
  csvParser,
  transformPlanetStream,
  outputStream,
  (err) => {
    if (err) console.warn('pipline error occurred:', err.message)
    else console.log('pipeline ended.')
  }
)

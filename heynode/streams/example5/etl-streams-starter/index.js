// REF: https://heynode.com/tutorial/use-streams-extract-transform-and-load-csv-data

const fs = require('fs')
const csv = require('csvtojson')
const { Transform } = require('stream')

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

      cb(null, planetMiniString)
    } catch (err) {
      cb(err)
    }
  }
})

inputStream
  .pipe(csvParser)
  .pipe(transformPlanetStream)
  .pipe(outputStream)

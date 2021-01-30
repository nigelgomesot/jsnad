const fs = require('fs').promises

// promise based fs

const writePromise = fs.writeFile('example3.out', 'test data')
const readPromise = fs.readFile('example3.out')

writePromise
  .then(() => console.log('write done'))
  .catch(err => console.error('error occurred:', err.message))

readPromise
  .then((data) => { console.log('read done'); return data })
  .then(data => console.log('data:', data))
  .catch(err => console.error('error occurred:', err.message))

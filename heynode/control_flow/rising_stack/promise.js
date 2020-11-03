// REF: https://github.com/RisingStack/nodejs-at-scale-handling-async/blob/master/handler/promise.js

const { fastFunctionPromise, mediumFunctionPromise, slowFunctionPromise } = require('./helpers')
const results = []

const runSerial = () => {
  slowFunctionPromise()
    .then(() => {
      results.push('slowFunction')
      return mediumFunctionPromise()
    })
    .then(() => {
      results.push('mediumFunction')
      return fastFunctionPromise()
    })
    .then(() => {
      results.push('fastFunction')

      return Promise.resolve()
    })
}

console.time('promise runSerial')
runSerial()
  .then(() => {
    console.log('done.')
    console.log('results:', results)
  })
  .catch((err) => {
    console.warn('error occurred:', err)
  })
  .then(() => {
    console.timeEnd('promise runSerial')
  })

// PENDING
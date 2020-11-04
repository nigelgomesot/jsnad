// REF: https://github.com/RisingStack/nodejs-at-scale-handling-async/blob/master/handler/promise.js

const { fastFunctionPromise, mediumFunctionPromise, slowFunctionPromise } = require('./helpers')
const results = []

const runSerial = () => {

  return new Promise((resolve, reject) => {
    return Promise.resolve()
      .then(() => {
        slowFunctionPromise()
          .then(result => results.push)
      })
      .then(() => {
        mediumFunctionPromise()
          .then(result => results.push)
      })
      .then(() => {
        fastFunctionPromise()
        .then(result => results.push)
      })
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

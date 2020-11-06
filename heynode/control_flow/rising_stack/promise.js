// REF: https://github.com/RisingStack/nodejs-at-scale-handling-async/blob/master/handler/promise.js

const { fastFunctionPromise, mediumFunctionPromise, slowFunctionPromise } = require('./helpers')
const results = []

const runSerial = () => {

  return  new Promise((resolve, reject) => {
      slowFunctionPromise()
        .then(result => results.push(result))
        .then(() => {
          mediumFunctionPromise()
            .then(result => results.push(result))
            .then(() => {
              fastFunctionPromise()
                .then(result => results.push(result))
                .then(() => resolve())
            })
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

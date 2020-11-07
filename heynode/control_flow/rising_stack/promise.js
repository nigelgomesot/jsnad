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

// console.time('promise runSerial')
// runSerial()
//   .then(() => {
//     console.log('done.')
//     console.log('results:', results)
//   })
//   .catch((err) => {
//     console.warn('error occurred:', err)
//   })
//   .then(() => {
//     console.timeEnd('promise runSerial')
//   })

const runParallel = (tasks) => {
  return Promise.all(tasks.map((task) => {
    return task
            .then(result => results.push(result))
            .catch(err => {console.warn})
  }))
}
const tasks = [
  slowFunctionPromise(),
  fastFunctionPromise(),
  mediumFunctionPromise(),
]
console.time('promise runParallel')
runParallel(tasks)
  .then(() => {
    console.log('done.')
    console.log('results:', results)
  })
  .catch((err) => {
    console.warn('error occurred:', err)
  })
  .then(() => {
    console.timeEnd('promise runParallel')
  })

// PENDING: ensure tasks order in results is the same.

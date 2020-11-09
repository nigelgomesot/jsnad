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
  return Promise.all(tasks.map((task, index) => {
    return task
            .then(result => results[index] = result)
            .catch(err => {console.warn})
  }))
}
// const tasks = [
//   mediumFunctionPromise(),
//   slowFunctionPromise(),
//   fastFunctionPromise(),
// ]
// console.time('promise runParallel')
// runParallel(tasks)
//   .then(() => {
//     console.log('done.')
//     console.log('results:', results)
//   })
//   .catch((err) => {
//     console.warn('error occurred:', err)
//   })
//   .then(() => {
//     console.timeEnd('promise runParallel')
//   })

// REF: https://glebbahmutov.com/blog/run-n-promises-in-parallel/#using-es6-promises
const task = (ms) => {
  return new Promise((resolve, reject) => {
    console.log(`processing ${ms}`)
    setTimeout(() => {
      resolve(ms)
    }, ms)
  })
}

const nextTask = () => {
  if (tasks.length)
    return task(tasks.shift())
}

const runParallelLimited = () => {
  return Promise.resolve().then(function next() {
    return nextTask().then(next)
  })
}

const tasks = [400, 100, 200, 300]
runParallelLimited()

// PENDING: parallel limited

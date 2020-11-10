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

const runParallelOld = (tasks) => {
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
const task = (ms, index) => {
  console.log(`⏳ task with ${ms}ms started`)

  return new Promise((resolve, reject) => {
    console.time(`✅ task with ${ms}ms ended`)
    setTimeout(() => {
      console.timeEnd(`✅ task with ${ms}ms ended`)

      results[index] = ms
      console.log('🔵 results:', results)
      resolve(ms)
    }, ms)
  })
}

const durations = [5000, 3000, 1000, 2000, 4000]

console.time('🛑 promise runParallel')
Promise.all(durations.map((duration, index) => task(duration, index)))
  .then(() => console.timeEnd('🛑 promise runParallel'))

// PENDING: serial
// PENDING: parallel limited

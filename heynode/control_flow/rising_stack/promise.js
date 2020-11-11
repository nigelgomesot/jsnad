// REF: https://github.com/RisingStack/nodejs-at-scale-handling-async/blob/master/handler/promise.js

const { fastFunctionPromise, mediumFunctionPromise, slowFunctionPromise } = require('./helpers')
const results = []

const runSerialOld = () => {

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

// console.time('promise runSerialOld')
// runSerialOld()
//   .then(() => {
//     console.log('done.')
//     console.log('results:', results)
//   })
//   .catch((err) => {
//     console.warn('error occurred:', err)
//   })
//   .then(() => {
//     console.timeEnd('promise runSerialOld')
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

const runParallel = () => {
  console.time('🛑 promise runParallel')
  Promise.all(durations.map((duration, index) => task(duration, index)))
  .then(() => console.timeEnd('🛑 promise runParallel'))
}
//runParallel()

const runSerial = () => {
  console.time('🛑 promise runSerial')
  return durations.reduce((chain, duration, index) => {
    return chain.then(() => task(duration, index))
  }, Promise.resolve())
  .then(() => console.timeEnd('🛑 promise runSerial'))
}
runSerial()

// PENDING: parallel limited

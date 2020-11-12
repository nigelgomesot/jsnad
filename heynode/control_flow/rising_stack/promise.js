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

// REF: https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/#1usingpromises
const runParallel = () => {
  console.time('🛑 promise runParallel')
  Promise.all(durations.map((duration, index) => task(duration, index)))
  .then(() => console.timeEnd('🛑 promise runParallel'))
}
//runParallel()

// REF: https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/#serialtaskexecution
const runSerial = () => {
  console.time('🛑 promise runSerial')
  return durations.reduce((chain, duration, index) => {
    return chain.then(() => task(duration, index))
  }, Promise.resolve())
  .then(() => console.timeEnd('🛑 promise runSerial'))
}
//runSerial()

// REF: https://dev.to/alemagio/node-parallel-execution-2h8p#limited-parallel-execution
const runParallelLimited = () => {
  console.time('🛑 promise runParallelLimited')

  const concurrency = 2,
        taskLength = durations.length

  let index = 0,
      running = 0,
      completed = 0

  const nextTask = () => {
    console.log('index', index)
    console.log('running', running)
    console.log('completed', completed)
    if (completed === taskLength)
      return Promise.resolve()

    while (running < concurrency && index < taskLength) {
      const duration = durations[index]
      task(duration, index)
        .then(() => {
          completed++
          running--
        })
      running++
      index++
    }

    return setTimeout(nextTask(), 5000)
  }

  nextTask().then(() => console.timeEnd('🛑 promise runParallelLimited'))
}
runParallelLimited()

// PENDING: runParallelLimited

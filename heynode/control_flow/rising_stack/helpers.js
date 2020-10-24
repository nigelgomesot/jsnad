// REF: https://github.com/RisingStack/nodejs-at-scale-handling-async/blob/master/util.js
// PENDING:
// Promise: https://jrsinclair.com/articles/2019/how-to-run-async-js-in-parallel-or-sequential/
// Async.js: https://medium.com/velotio-perspectives/understanding-node-js-async-flows-parallel-serial-waterfall-and-queues-6f9c4badbc17
// Await: https://github.com/RisingStack/nodejs-at-scale-handling-async/blob/master/handler/await.js

const { promisify } = require('util')

const fastFunction = (done) => {
  console.time('fastFunction')
  setTimeout(() => {
    console.timeEnd('fastFunction')
    done(null, 'fastFunction')
    //done('fastFunction error')
  }, 1000)
}

const mediumFunction = (done) => {
  console.time('mediumFunction')
  setTimeout(() => {
    console.timeEnd('mediumFunction')
    done(null, 'mediumFunction')
  }, 3000)
}

const slowFunction = (done) => {
  console.time('slowFunction')
  setTimeout(() => {
    console.timeEnd('slowFunction')
    done(null, 'slowFunction')
  }, 5000)
}

const fastFunctionPromise = promisify(fastFunction)
const mediumFunctionPromise = promisify(mediumFunction)
const slowFunctionPromise = promisify(slowFunction)

module.exports = {
  fastFunction,
  mediumFunction,
  slowFunction,
  fastFunctionPromise,
  mediumFunctionPromise,
  slowFunctionPromise
}

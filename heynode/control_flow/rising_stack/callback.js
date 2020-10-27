// REF: https://github.com/RisingStack/nodejs-at-scale-handling-async/blob/master/handler/callback.js
// REF: https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/#avoidingcallbackhellwithcontrolflowmanagers

const { fastFunction, mediumFunction, slowFunction } = require('./helpers')
const results = []
const runSerial = (cb) => {
  fastFunction((err, result) => {
    if (err) return cb(err)
    results.push(result)

    mediumFunction((err, result) => {
      if (err) return cb(err)
      results.push(result)

      slowFunction((err, result) => {
        results.push(result)
        cb(err)
      })
    })
  })
}

// console.time('callback runSerial')
// runSerial(err => {
//   if(err) console.warn('error occurred:', err)
//   else console.log('done.')
//   console.log('results:', results)
//   console.timeEnd('callback runSerial')
// })


// REF: https://www.alxolr.com/articles/learning-asynchronous-programming-in-node-js-with-callbacks#run-in-parallel
const runParallel = (cb) => {
  const results = []
  let pending = 0

  fastFunction((err, result) => {
    gateKeeper(err, result)
  })

  mediumFunction((err, result) => {
    gateKeeper(err, result)
  })

  slowFunction((err, result) => {
    gateKeeper(err, result)
  })

  function gateKeeper(err, result) {
    if (err) return cb(err)

    results.push(result)

    if (results.length == 3) {
      return cb(null, results)

    }
  }
}

console.time('callback runParallel')
runParallel((err, results) => {
  if(err) console.warn('error occurred:', err)
  else console.log('done.')
  console.log('results:', results)
  console.timeEnd('callback runParallel')
})

// PENDING: gaurantee results order.

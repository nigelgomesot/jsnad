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

console.time('callback')
runSerial(err => {
  if(err) console.warn('error occurred:', err)
  else console.log('done.')
  console.log('results:', results)
  console.timeEnd('callback')
})

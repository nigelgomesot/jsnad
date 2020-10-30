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
const runParallelOld = (cb) => {
  const results = []
  let pending = 0

  slowFunction((err, result) => {
    gateKeeper(err, result)
  })

  fastFunction((err, result) => {
    gateKeeper(err, result)
  })

  mediumFunction((err, result) => {
    gateKeeper(err, result)
  })

  function gateKeeper(err, result) {
    const index = pending++

    if (err) return cb(err)

    results[index] = result

    if (pending == 3) {
      return cb(null, results)
    }
  }
}

// console.time('callback runParallelOld')
// runParallelOld((err, results) => {
//   if(err) console.warn('error occurred:', err)
//   else console.log('done.')
//   console.log('results:', results)
//   console.timeEnd('callback runParallelOld')
// })


const runParallelOld2 = (collection, callback) => {
  const results = []
  let pending = 0
  let alreadyCallback = false

  collection.forEach(obj => async_custom(obj, gateKeeper()))

  function gate(err, data) {
    if (!alreadyCallback) {
      alreadyCallback = true

      return callback(err, data)
    }
  }

  function gateKeeper() {
    let order = pending
    pending++

    return (err, result) => {
      pending--

      if (err) return gate(err)

      results[order] = result
      if (!pending) gate(null, result)
    }
  }
}

const async_custom = (obj, callback) => {
  switch(obj.speed) {
    case 'fast':
      fastFunction((err, result) => {
        console.log('ff result', result)
        callback(err, result)
      })
      break
    case 'medium':
      mediumFunction((err, result) => {
        callback(err, result)
      })
      break
    case 'slow':
      slowFunction((err, result) => {
        callback(err, result)
      })
      break
    default:
      callback('spped not specified')
  }
}

// const objects = [
//   //{ id: 1, speed: 'slow' },
//   { id: 2, speed: 'fast' },
//   //{ id: 3, speed: 'medium' },
// ]

// runParallelOld2(objects, (err, results) => {
//   if (err) { console.warn('error occurred:', err)}

//   console.log('results:', results)
//   console.log('done')
// })


// REF: https://dev.to/alemagio/node-parallel-execution-2h8p

const processTask = (err, result) => {
  if(err) {
    results[index] << `${speed}:error`
    return
  }

  const index = result.index
  const speed = result.speed
  const data = result.data
  results[index] << `${speed}:done:${data}`
}

const buildTask = (index, speed, callback) => {
  results[index] << `${speed}:pending`

  let task_err
  let task_result = {
    index: index,
    speed: speed,
    data: null
  }
  switch(speed) {
    case 'fast':
      fastFunction((err, data) => {
        task_err = err
        task_result.data = data
        callback(task_err, task_result)
      })
      break
    case 'medium':
      mediumFunction((err, data) => {
        task_err = err
        task_result.data = data
        callback(task_err, task_result)
      })
      break
    case 'slow':
      slowFunction((err, data) => {
        task_err = err
        task_result.data = data
        callback(task_err, task_result)
      })
      break
  }
}

const tasks = [
  (cb) => buildTask(0, 'slow', processTask),
  (cb) => buildTask(1, 'fast', processTask),
  (cb) => buildTask(2, 'medium', processTask),
]

const runParallel = (tasks) => {
  let completed = 0

  for (let task of tasks) {
    task(() => {
      console.log('processing')
      if (++completed === tasks.length)
        console.log('results completed:', results)
    })
  }
}

runParallel(tasks)

// PENDING: task callback not called.

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
      callback('speed not specified')
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
  const index = result.index
  const speed = result.speed
  const data = result.data

  if(err)
    results[index] = `${speed}:error:${err}`
  else
    results[index] = `${speed}:done:${data}`
}

const buildTask = (index, speed, done) => {
  results[index] = `${speed}:pending`

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
        processTask(task_err, task_result)
        done()
      })
      break
    case 'medium':
      mediumFunction((err, data) => {
        task_err = err
        task_result.data = data
        processTask(task_err, task_result)
        done()
      })
      break
    case 'slow':
      slowFunction((err, data) => {
        task_err = err
        task_result.data = data
        processTask(task_err, task_result)
        done()
      })
      break
  }
}

const tasks = [
  (done) => buildTask(0, 'slow', done),
  (done) => buildTask(1, 'fast', done),
  (done) => buildTask(2, 'medium', done),
]

const runParallelOld3 = (tasks) => {
  let completed = 0

  for (let task of tasks) {
    task(() => {
      if (++completed < tasks.length)
        console.log('results processing', results)
      else
        console.log('results completed:', results)
    })
  }
}

// runParallelOld3(tasks)

tasks.push((done) => buildTask(3, 'fast', done))

const runParallelLimitedOld = (tasks) => {
  let completed = 0
  let running = 0
  let taskIndex = 0
  let tasksCount = tasks.length

  const run = () => {
    if (completed >= tasksCount) {
      console.log('results completed:', results)
    }

    while (running < 2 && taskIndex < tasksCount) {
      const task = tasks[taskIndex]

      task(() => {
        completed++
        running--
        run()
      })
      console.log('results processing', results)
      taskIndex++
      running++
    }
  }

  run()
}
//runParallelLimitedOld(tasks)


const durations  = [5000, 3000, 1000, 2000, 4000]

const task = (duration, index, cb) => {
  console.log(`⏳ task with ${duration} ms started`)
  console.time(`✅ task with ${duration} ms ended`)

  setTimeout(() => {
    results[index] = duration
    console.timeEnd(`✅ task with ${duration} ms ended`)
    cb(null, duration)
  }, duration)
}

// task(3000, 1, (err, result) => {
//   console.log('done', results)
// })

const runParallelLimited = () => {
  console.time('🛑 callback runParallelLimited')

  const concurrency = 2,
        taskLength = durations.length

  let index = 0,
      running = 0,
      completed = 0

  const nextTask = (cb) => {
    console.log('index', index)
    console.log('running', running)
    console.log('completed', completed)

    if (completed === taskLength) {
      return cb()
    }

    while (running < concurrency && index < taskLength) {
      const duration = durations[index]

      task(duration, index, () => {
        running--
        completed++
        nextTask(cb)
      })
      running++
      index++
    }
  }

  nextTask(() => {
    console.timeEnd('🛑 callback runParallelLimited')
  })
}
runParallelLimited()

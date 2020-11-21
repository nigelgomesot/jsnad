// REF: https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/#2meetasyncakahowtowriteasynccodein2020


const durations  = [5000, 3000, 1000, 2000, 4000]
const results = []

const timerPromise = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(duration), duration)
  })
}

const task = async (duration, index) => {
  console.log(`⏳ task with ${duration} ms started`)
  console.time(`✅ task with ${duration} ms ended`)

  const result = await timerPromise(duration)
  results[index] = result
  console.timeEnd(`✅ task with ${duration} ms ended`)
}

//task(3000, 2).then(() => console.log('done'))

const runParallelLimited = () => {
  console.time('🛑 async runParallelLimited')

  const taskLength = durations.length,
        concurrency = 2

  let index = 0,
      running = 0,
      completed = 0

  const nextTask = () => {

    if (completed == taskLength) {
      console.timeEnd('🛑 async runParallelLimited')
      return
    }

    while (running < concurrency && index < taskLength) {
      const duration = durations[index]

      task(duration, index).then(() => {
        running--
        completed++

        nextTask()
      })

      running++
      index++
    }
  }

  nextTask()
}
//runParallelLimited()


// REF: https://medium.com/velotio-perspectives/understanding-node-js-async-flows-parallel-serial-waterfall-and-queues-6f9c4badbc17

const async = require('async')

const timerCallback = (duration, callback) => {
  console.log(`⏳ task with ${duration} ms started`)
  console.time(`✅ task with ${duration} ms ended`)

  setTimeout(() => {
    console.timeEnd(`✅ task with ${duration} ms ended`)
    callback(null, duration)
  }, duration)
}

const asyncParallelTasks = [
  (callback) => timerCallback(5000, callback),
  (callback) => timerCallback(3000, callback),
  (callback) => timerCallback(4000, callback)
]

const runAsyncParallel = (tasks) => {
  console.time('🛑 async parallel')

  async.parallel(tasks, (err, results) => {
    console.log('results:', results)
    console.timeEnd('🛑 async parallel')
  })
}
//runAsyncParallel(asyncParallelTasks)


const asyncSeriesTasks = [
  (callback) => timerCallback(5000, callback),
  (callback) => timerCallback(3000, callback),
  (callback) => timerCallback(4000, callback)
]

const runAsyncSeries = (tasks) => {
  console.time('🛑 async series')

  async.series(tasks, (err, results) => {
    console.log('results:', results)
    console.timeEnd('🛑 async series')
  })
}
//runAsyncSeries(asyncSeriesTasks)


const fnWaterfallArg0 = (callback) => {
  timerCallback(5000, (err, result) => {
    callback(null, result)
  })
}

const fnWaterfallArg1 = (arg1, callback) => {
  timerCallback(3000, (err, result) => {
    callback(null, arg1, result)
  })
}

const fnWaterfallArg2 = (arg1, arg2, callback) => {
  timerCallback(4000, (err, result) => {
    const final_result = arg1 + arg2 + result

    callback(null, final_result)
  })
}

const asyncWaterfallTasks = [
    fnWaterfallArg0,
    fnWaterfallArg1,
    fnWaterfallArg2
  ]

const runAsyncWaterfall = (tasks) => {
  console.time('🛑 async waterfall')

  async.waterfall(tasks, (err, result) => {
    console.log('result:', result)
    console.timeEnd('🛑 async waterfall')
  })
}
runAsyncWaterfall(asyncWaterfallTasks)

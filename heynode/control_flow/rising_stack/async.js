// REF: https://blog.risingstack.com/node-js-async-best-practices-avoiding-callback-hell-node-js-at-scale/#2meetasyncakahowtowriteasynccodein2020


const durations  = [5000, 3000, 1000, 2000, 4000]
const results = []

const timer = (duration) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(duration), duration)
  })
}

const task = async (duration, index) => {
  console.log(`⏳ task with ${duration} ms started`)
  console.time(`✅ task with ${duration} ms ended`)

  const result = await timer(duration)
  results[index] = result
  console.timeEnd(`✅ task with ${duration} ms ended`)
}

//task(3000, 2).then(() => console.log('done'))

const runParallelLimited = () => {
  console.log('runParallelLimited started')
  console.time('runParallelLimited ended')

  const taskLength = durations.length,
        concurrency = 2
  let index = 0,
      running = 0,
      completed = 0

  const nextTask = () => {

    if (completed == taskLength) {
      console.timeEnd('runParallelLimited ended')
      return
    }

    while (running < concurrency && index < taskLength) {
      const duration = durations[index]

      task(duration, index).then(() => {
        console.log('processing')
        return
        running--
        completed++

        return nextTask()
      })
    }
    running++
    index++
  }

  nextTask()
}
runParallelLimited()


// PENDING: runParallelLimited

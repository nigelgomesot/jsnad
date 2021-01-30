// REF: http://book.mixu.net/node/ch7.html#7-2-3-control-flow-pattern-3-limited-parallel-an-asynchronous-parallel-concurrency-limited-for-loop

const custom_async = (arg, callback) => {
  console.log(`do something with ${arg} & return 1 sec later.`)
  setTimeout(() => {
    callback(arg * 2)
  }, 1000)
}

const final = () => {
  console.log('results:', results)
  console.log('done')
}

var items = [1, 2, 3, 4, 5, 6]
var results = []
var running = 0
var runningLimit = 2

const run = () => {
  while (running < runningLimit && items.length > 0) {
    var item = items.shift()

    custom_async(item, result => {
      results.push(result)
      running--

      if (items.length > 0)
        run()
      else if (running == 0)
        final()
    })

    running++
  }
}

run()

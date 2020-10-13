// REF:http://book.mixu.net/node/ch7.html#7-2-2-control-flow-pattern-2-full-parallel-an-asynchronous-parallel-for-loop

const custom_async = (arg, callback) => {
  console.log(`do something with ${arg} and return 1 sec later.`)
  setTimeout(() => {
    callback(arg * 2)
  }, 1000)
}

const final = () => {
  console.log('results:', results)
  console.log('done.')
}

var items = [1,2,3,4,5,6]
var results = []

items.forEach(item => {
  custom_async(item, result => {
    results.push(result)
    if (results.length == items.length)
      final()
  })
})

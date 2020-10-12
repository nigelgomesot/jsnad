// REF: http://book.mixu.net/node/ch7.html#7-2-1-control-flow-pattern-1-series-an-asynchronous-for-loop

const custom_async = (arg, callback) => {
  console.log(`do something with ${arg} & return 1 second later`)
  setTimeout(() => {
    callback(arg * 2)
  }, 1000)
}

const final = () => {
  console.log('results:', results)
  console.log('done')
}

let items = [1, 2, 3, 4, 5, 6]
let results = []
const series = (item) => {
  if (item) {
    custom_async(item, result => {
      results.push(result)
      return series(items.shift())
    })
  } else {
    return final()
  }
}


series(items.shift())

// REF: http://book.mixu.net/node/ch7.html#full-parallel

const custom_async = (arg, callback) => {
  const delay = Math.floor(Math.random() * 5 + 1) * 100
  console.log(`async with ${arg} & return in ${delay} ms.`)

  setTimeout(() => {
    callback(arg * 2)
  }, delay)
}

const final = results => {
  console.log('results:', results)
  console.log('done.')
}

const fullParallel = (callbacks, last) => {
  const results = []
  let result_count = 0

  callbacks.forEach((callback, index) => {
    callback(() => {
      results[index] = Array.prototype.slice.call(arguments)
      result_count++

      if (result_count == callbacks.length)
        last(results)
    })
  })
}

fullParallel([
  next => { custom_async(1, next)},
  next => { custom_async(2, next)},
  next => { custom_async(3, next)},
  next => { custom_async(4, next)},
  next => { custom_async(5, next)},
  next => { custom_async(6, next)},
],final)

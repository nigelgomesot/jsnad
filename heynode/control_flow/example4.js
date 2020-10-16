// REF: http://book.mixu.net/node/ch7.html#series

const custom_async = (arg, callback) => {
  const delay =  Math.floor(Math.random() * 5 + 1) * 100
  console.log(`async with arg: ${arg} & return in ${delay} ms`)
  setTimeout(() => {
    callback(arg * 2)
  }, delay)
}

const final = results => {
  console.log('results', results)
  console.log('done.')
}

const series = (callbacks, last) => {
  const results = []

  const next = () => {
    const callback = callbacks.shift()

    if (callback) {
      callback(function() {
        //console.log('arguments', arguments)
        results.push(Array.prototype.slice.call(arguments))
        next();
      })
    } else {
      last(results)
    }
  }

  next()
}

series(
  [
    next => { custom_async(1, next) },
    next => { custom_async(2, next) },
    next => { custom_async(3, next) },
    next => { custom_async(4, next) },
    next => { custom_async(5, next) },
    next => { custom_async(6, next) }
  ],
  final
)

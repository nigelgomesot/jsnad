// REF: http://book.mixu.net/node/ch7.html#limited-parallel

const limited = (limit, callbacks, last) => {
  const results = []
  let running = 1
  let task = 0

  const next = () => {
    running--

    if (task == callbacks.length && running == 0)
      last(results)

    while (running < limit && callbacks[task]) {
      let callback = callbacks[task]

      (function(index) {
        callback(function() {
          results[index] = Array.prototype.slice.call(arguments)
          next()
        })
      })(task)

      task++
      running++
    }
  }

  next()
}

// PENDING

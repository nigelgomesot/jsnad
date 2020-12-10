// REF: https://www.valentinog.com/blog/error/#what-is-an-exception

// Error handlling in promises
const failAfterSeconds = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(Error(`error after ${ms} ms`))
    }, ms)
  })
}

failAfterSeconds(3000)
  .catch(err => {
    console.warn('error message:', err.message)
    console.warn('error stack:', err.stack)
  })

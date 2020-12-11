// REF: https://www.valentinog.com/blog/error/#what-is-an-exception

// Error handling in promises

// basic async
const failAfterSeconds = (ms) => {
  return new Promise((_, reject) => {
    setTimeout(() => {
      reject(Error(`error after ${ms} ms`))
    }, ms)
  })
}

const runFailAfterSeconds = () => {
  failAfterSeconds(3000)
  .catch(err => {
    console.warn('error message:', err.message)
    console.warn('error stack:', err.stack)
  })
}
//runFailAfterSeconds()

const resolvedPromise = Promise.resolve('resolved')
const rejectedPromise = Promise.reject('rejected')

// Promise.all
const runPromiseAll = () => {
  Promise.all([resolvedPromise, rejectedPromise])
    .then(results => console.log('results', results))
    .catch(err => console.warn('error:', err))
    .finally(() => console.log('Promise.all done.'))
}
//runPromiseAll()

// Promise.race
const runPromiseRace = () => {
  Promise.race([resolvedPromise, rejectedPromise])
    .then(results => console.log('results', results))
    .catch(err => console.warn('error:', err))
    .finally(() => console.log('Promise.race done.'))

  Promise.race([rejectedPromise, resolvedPromise])
    .then(results => console.log('results', results))
    .catch(err => console.warn('error:', err))
    .finally(() => console.log('Promise.race done.'))
}
runPromiseRace()

// REF: https://www.valentinog.com/blog/error/#what-is-an-exception

const toUpperCasePromise = async str => {
  if (typeof str !== 'string')
    throw new TypeError('str must be a string type.')
  else
    return str.toUpperCase()
}

// async/await: async error handling (promise)
const runToUpperCaseAsync = (str) => {
  toUpperCasePromise(str)
  .then(result => console.log('result:', result))
  .catch(error => console.error('error:', error))
  .finally(() => console.log('runToUpperCaseAsync done.'))
}

//runToUpperCaseAsync(1)
//runToUpperCaseAsync('abc')

// async/await: sync error handling (try/catch)
const runToUpperCaseSync = async str => {
    try {
      const result = await toUpperCasePromise(str)
      console.log('result:', result)
    } catch (error) {
      console.error('error:', error)
    } finally {
      console.log('runToUpperCaseSync done.')
    }
}
//runToUpperCaseSync(1)
runToUpperCaseSync('abc')

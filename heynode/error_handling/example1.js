// REF: https://levelup.gitconnected.com/the-definite-guide-to-handling-errors-gracefully-in-javascript-58424d9c60e6

try {
  const err = new Error('test error')

  throw err
} catch(e) {
  console.warn('error message:', e.message)
  console.warn('error stack:', e.stack)
}

// REF: https://www.valentinog.com/blog/error/#error-handling-for-generator-functions

// Sync error handling inside of fn
function* generateSync1() {
  try {
    yield 33
    yield 39
  } catch (error) {
    console.error('error:', error)
  } finally {
    console.log('generateSync1 done')
  }
}

const runGenerateSync1 = () => {
  const go = generateSync1()
  console.log('value:', go.next().value)

  go.throw(Error('cutom error'))

  console.log('value:', go.next().value)
}
//runGenerateSync1()

// Sync error handling outside of fn
function* generateSync2() {
  yield 33
  throw Error('custom error')
  yield 39
}

const runGenerateSync2 = () => {
  try {
    for (const value of generateSync2())
      console.log('value:', value)
  } catch (error) {
    console.error('error:', error)
  } finally {
    console.log('generateSync2 done')
  }
}
runGenerateSync2()

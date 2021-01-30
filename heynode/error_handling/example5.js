// REF: https://www.valentinog.com/blog/error/#error-handling-for-async-generators

let go

// async error handing via Handler
async function* generateFn1() {
  yield 33
  throw Error('Something went wrong!')
  yield 39
}

const runGenerateFn1ViaHandler = () => {
  const go = generateFn1()

  go.next().then(value => console.log('value:', value))
  go.next().catch(error => console.error('error:', error))
  go.next().then(value => console.log('value:', value))
}
//runGenerateFn1ViaHandler()

// async error handing via Iterator
const runGenerateFn1ViaIterator = async () => {
  try {
    for await (const value of generateFn1())
      console.log('value:', value)
  } catch (error) {
    console.error('error:', error)
  } finally {
    console.log('runGenerateFn1ViaIterator done.')
  }
}
//runGenerateFn1ViaIterator()

// async error thrown from outside is sent inside the generator
async function* generatorFn2() {
  try {
    yield 33
    yield 39
  } catch (error) {
    console.error('inside error:', error.message)
  }
}

const runGenerateFn2ViaHandler = () => {
  const go = generatorFn2()

  go.next().then(value => console.log('value:', value))

  go.throw(Error('custom error'))
    .catch(error => console.error('outside error:', error.message))

  go.next().then(value => console.log('value:', value))
}
runGenerateFn2ViaHandler()

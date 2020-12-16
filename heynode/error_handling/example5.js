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
runGenerateFn1ViaIterator()

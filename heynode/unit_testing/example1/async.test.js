// REF: https://flaviocopes.com/jest/#testing-asynchronous-code

// Calllbacks
describe('testing callbacks', () => {
  const upperCaseCallback = (str, callback) => {
    callback(str.toUpperCase())
  }

  test('converts str to upper case via callback', (done) => {
    upperCaseCallback('test', str => {
      expect(str).toBe('TEST')
      done()
    })
  })
})

// Promises
describe('testing promises', () => {
  const upperCasePromise = str => {
    return new Promise((resolve, reject) => {
      if (!str) {
        reject('empty string')

        return
      }

      resolve(str.toUpperCase())
    })
  }

  test('converts str to upper case via promise', () => {
    return upperCasePromise('test').then(str => {
      expect(str).toBe('TEST')
    })
  })
})

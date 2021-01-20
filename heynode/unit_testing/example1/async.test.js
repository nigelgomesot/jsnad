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

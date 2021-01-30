// REF: https://jestjs.io/docs/en/setup-teardown#scoping

describe('testing cities', () => {
  const cities = []

  const setupCities = () => {
    console.log('setupCities....')
    cities.push('Mumbai')
    cities.push('Chicago')
    cities.push('London')
    expect(cities.length).toBe(3)
  }

  const teardownCities = () => {
    console.log('teardownCities....')
    cities.splice(0)
    expect(cities.length).toBe(0)
  }

  beforeEach(() => {
    setupCities()
  })

  afterEach(() => {
    teardsownCities()
  })

  test('`Mumbai` is present', () => {
    expect(cities).toContain('Mumbai')
  })

  test('`Chicago` is present', () => {
    expect(cities).toContain('Chicago')
  })

  test('`London` is present', () => {
    expect(cities).toContain('London')
  })
})


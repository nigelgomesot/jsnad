// REF: https://jestjs.io/docs/en/setup-teardown#one-time-setup

const cities = []

beforeAll(() => {
  setupCities()
})

afterAll(() => {
  teardownCities()
})

test('`Mumbai` city is present', () => {
  expect(cities).toContain('Mumbai')
})

test('`Chicago` city is present', () => {
  expect(cities).toContain('Chicago')
})

test('`London` city is present', () => {
  expect(cities).toContain('London')
})

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

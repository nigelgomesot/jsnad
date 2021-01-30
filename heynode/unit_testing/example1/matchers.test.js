const { sum } = require('./math')

test('toBe', () => {
  expect(sum(1,1)).toBe(2)
})

test('not toBe', () => {
  expect(sum(1,1)).not.toBe(1)
})

test('toEqual', () => {
  expect(sum(1,1)).toBe(2)
})

test('toBeNull', () => {
  const a = [null]
  expect(a[0]).toBeNull()
})

test('toBeDefined', () => {
  const  a = [1]
  expect(a[0]).toBeDefined()
})

test('toBeUndefined', () => {
  const a= []
  expect(a[0]).toBeUndefined()
})

test('toBeCloseTo', () => {
  const a = 1.2
  expect(a).toBeCloseTo(1.195)
})

test('toBeTruthy', () => {
  const a = 1
  expect(a).toBeTruthy()
})

test('toBeFalsy', () => {
  const a = 0
  expect(a).toBeFalsy()
})

test('toBeGreaterThan', () => {
  const a = 10
  expect(a).toBeGreaterThan(5)
})

test('toBeGreaterThanOrEqual', () => {
  const a = 10
  expect(a).toBeGreaterThanOrEqual(10)
})

test('toBeLessThan', () => {
  const a = 10
  expect(a).toBeLessThan(20)
})

test('toBeLessThanOrEqual', () => {
  const a = 10
  expect(a).toBeLessThanOrEqual(10)
})

test('toMatch', () => {
  const a = '123'
  expect(a).toMatch(/\d{3}/)
})

test('toContain', () => {
  const a = [1, 2, 3]
  expect(a).toContain(2)
})

test('toHaveLength', () => {
  const a = [1, 2, 3]
  expect(a).toHaveLength(3)
})

test('toHaveProperty', () => {
  const a = { 'A': 'letter A' }
  expect(a).toHaveProperty('A', 'letter A')
})

test('toHaveProperty', () => {
  const a = { 'A': 'letter A' }
  expect(a).toHaveProperty('A', 'letter A')
})

test('toThrowError', () => {
  const a = () => { throw new Error('an error') }
  expect(a).toThrowError(Error('an error'))
})

test('toBeInstanceOf', () => {
  const a = []
  expect(a).toBeInstanceOf(Array)
})

test('not toBeInstanceOf', () => {
  const a = []
  expect(a).not.toBeInstanceOf(Number)
})

test('promise resolves', () => {
  expect(Promise.resolve('success')).resolves.toBe('success')
})

test('promise rejects', () => {
  expect(Promise.reject(new Error('failed'))).rejects.toThrow('failed')
})

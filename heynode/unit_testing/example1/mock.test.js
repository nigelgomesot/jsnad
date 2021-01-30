const { sum, mul, sub, div } = require('./math')

const math = {
  sum: sum
}

describe('math sum function', () => {
  test('returns sum value', () => {
    const result = math.sum(1, 2)
    expect(result).toBe(3)
    expect(typeof result).toBe('number')
  })

  test('returns sum value with spyOn', () => {
    const spy = jest.spyOn(math, 'sum')

    const result = math.sum(1, 2)
    expect(result).toBe(3)
    expect(typeof result).toBe('number')

    expect(math.sum).toHaveBeenCalled()
    expect(math.sum).toHaveBeenCalledTimes(1)
    expect(math.sum).toHaveBeenCalledWith(1, 2)
  })

  test('returns sum value via mock', () => {
    math.sum = jest.fn(() => BigInt('3'))

    const result = math.sum(1, 2)
    expect(result).toBe(3n)
    expect(typeof result).toBe('bigint')
    expect(math.sum).toHaveBeenCalled()
    expect(math.sum).toHaveBeenCalledTimes(1)
    expect(math.sum).toHaveBeenCalledWith(1, 2)
  })
})

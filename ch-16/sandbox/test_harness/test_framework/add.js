'use strict'

module.exports = (a, b) => {
  if (typeof a !== 'number' || typeof b !== 'number')
    throw TypeError('input must be numbers')

    return a + b
}

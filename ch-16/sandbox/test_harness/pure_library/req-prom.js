'use strict'

const { promisify } = require('util')
const setTimeoutPromise = promisify(setTimeout)

module.exports = async (url) => {
  await setTimeoutPromise(300)

  if (url === 'http://error.com')
    throw Error('network error')
  else
    return Buffer.from('ok')
}

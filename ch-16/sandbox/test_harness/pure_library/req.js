'use strict'

module.exports = (url, cb) => {
  setTimeout(() => {
    if (url === 'http://error.com')
      cb(Error('network error'))
    else
    cb(null, Buffer.from('ok'))
  }, 300)
}

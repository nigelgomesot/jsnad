'use strict'

const store =  require('../store')

test('handles store errors', done => {
  store('a', err => {
    expect(err).toStrictEqual(Error('input must be a buffer'))
    done()
  })
})

test('stores the buffer & returns 4 digit id', done => {
  store(Buffer.from('a'), (err, data) => {
    expect(err).toBe(null)
    expect(data['id'].length).toEqual(4)
    done()
  })
})

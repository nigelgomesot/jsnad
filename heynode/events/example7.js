// async demo

const EventEmitter = require('events')
const fetch = require('node-fetch')

class WithTime extends EventEmitter {
  execute(asyncFn, ...args) {
    this.emit('start')
    console.time('execute')

    this.on('data', data => console.log('data received:', data))

    asyncFn(...args, (err, data) => {
      if (err)
        return this.emit('err', err)

      this.emit('data', data)
      console.timeEnd('execute')
      this.emit('stop')
    })
  }
}

const withTime = new WithTime()

withTime.on('start', () => console.log('withTime started'))
withTime.on('stop', () => console.log('withTime stopped.'))

const readFile = (url, cb) => {
  fetch(url)
    .then(resp => resp.json())
    .then(data => cb(null, data))
}

withTime.execute(readFile, 'https://jsonplaceholder.typicode.com/posts/1')

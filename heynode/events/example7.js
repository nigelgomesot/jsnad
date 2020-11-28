// async demo

const EventEmitter = require('events')

class WithTime extends EventEmitter {
  execute(asyncFn, ...args) {
    this.emit('begin')
    console.time('execute')

    this.on('data', data => console.log('data received:', data))

    asyncFn(...args, (err, data) => {
      if (err)
        return this.emit('err', err)

      this.emit('data', data)
      console.timeEnd('execute')
      this.emit('end')
    })
  }
}

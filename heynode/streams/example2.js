// REF: https://heynode.com/tutorial/what-stream

// Error handling

const { PassThrough } = require('stream')
const passThrough = new PassThrough()

passThrough.on('error', err => {
  console.warn('passThrough encountered an error:', err)
})

process.stdin.on('error', err => {
  console.warn('passThrough stdin encountered an error:', err)
})

process.stdout.on('error', err => {
  console.warn('passThrough stdout encountered an error:', err)
})

process.stdin.pipe(process.stdout)
passThrough.emit('error', new Error('Error occurred'))
console.log('done')

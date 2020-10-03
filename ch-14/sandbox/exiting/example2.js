'use strict'

setInterval(() => {
  console.log('this interval keeps process open')
  process.exitCode = 1
}, 500)

setTimeout(() => {
  console.log('process completed')
  process.exit()
}, 1750)

process.on('exit', code => {
  console.log(`exiisting with code; ${code}`)

  setTimeout(() => {
    console.log('ths will not execute')
  }, 500)
})

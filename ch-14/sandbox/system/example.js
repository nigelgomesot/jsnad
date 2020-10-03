'use strict'

const os = require('os')

const runOS = () => {
  console.log('hostname:', os.hostname())
  console.log('home dir:', os.homedir())
  console.log('tmp dir:', os.tmpdir())
}
// runOS()

const runPlatform = () => {
  console.log('platform:', os.platform())
  console.log('type/uname:', os.type())
}
// runPlatform()

const runSystemStats = () => {
  setInterval(() => {
    console.log('uptime:', os.uptime())
    console.log('free memory:', os.freemem())
    console.log('total memory:', os.totalmem())
  }, 1000);
}
runSystemStats()

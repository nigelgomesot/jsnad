// REF: https://nodejs.dev/learn/the-nodejs-os-module

const os = require('os')

// basic os methodss

console.log('os.arch():', os.arch())
console.log('os.cpus():', os.cpus())
console.log('os.endianness():', os.endianness())
console.log('os.freemem():', os.freemem())
console.log('os.homedir():', os.homedir())
console.log('os.hostname():', os.hostname())
console.log('os.loadavg():', os.loadavg())
console.log('os.networkInterfaces():', os.networkInterfaces())
console.log('os.platform():', os.platform())
console.log('os.release():', os.release())
console.log('os.tmpdir():', os.tmpdir())
console.log('os.totalmem():', os.totalmem())
console.log('os.type():', os.type())
console.log('os.uptime():', os.uptime())
console.log('os.userInfo():', os.userInfo())

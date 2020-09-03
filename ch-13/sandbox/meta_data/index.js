'use strict'

const { readdirSync, statSync } = require('fs')

const files = readdirSync('.')

for (const filename of files) {
  const stat =  statSync(filename)
  const fileType = stat.isDirectory() ? 'dir' : 'file'
  console.log(`${fileType}: ${filename}`)
}

for (const filename of files) {
  const stat = statSync(filename)
  const label = stat.isDirectory() ? 'dir: ' : 'file: '
  const { atime, ctime, mtime, birthtime } = stat

  console.group(label, filename)
  console.log(`atime: ${atime.toLocaleString()}`)
  console.log(`ctime: ${ctime.toLocaleString()}`)
  console.log(`mtime: ${mtime.toLocaleString()}`)
  console.log(`birthtime: ${birthtime.toLocaleString()}`)
  console.groupEnd()
  console.log()
}

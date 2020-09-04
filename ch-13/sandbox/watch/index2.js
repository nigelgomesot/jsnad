'use strict'

const { join, resolve } = require('path')
const { watch, readdirSync, statSync } = require('fs')

const dir = resolve('./data')
const files =  new Set(readdirSync('./data'))

watch('./data', (event, filename) => {
  try {
    const { ctimeMs, mtimeMs } = statSync(join(dir, filename))

    if (!files.has(filename)) {
      event = 'created'
      files.add(filename)
    } else {
      if (ctimeMs === mtimeMs) event = 'content-updated'
      else event = 'status-updated'
    }
  } catch (err) {
    if (err.code === 'ENOENT') {
      files.delete(filename)
      event = 'deleted'
    } else {
      console.error(`error occurred: ${err.message}`)
    }
  } finally {
    console.log(`${event}: ${filename}`)
  }
})


'use strict'

const { readdirSync, readdir } = require('fs')
const { readdir: readdirProm } = require('fs').promises

// Synchronous
const sync = () => {
  try {
    const files = readdirSync(__dirname)
    console.log('sync:', files)
  } catch (err) {
    console.warn(`sync error occurred: ${err.message}`)
  }
}
sync()

// Callback
const cb = () => {
  readdir(__dirname, (err, files) => {
    if (err) {
      console.warn(`cb error occurred: ${err.message}`)
      return
    }

    console.log('cb:', files)
  })
}
cb()

// Async/Await

async function prom() {
  const files = await readdirProm(__dirname)

  return files
}
prom()
  .then(files => {
    console.log('promise:', files)
  }).catch(err => {
    console.warn(`promis error occurred: ${err.message}`)
  })

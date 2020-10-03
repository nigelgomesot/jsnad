'use strict'

const { watch } = require('fs')
const { join } = require('path')

const targetDir =  join(__dirname, 'data/')

watch(targetDir, (event, filename) => {
  console.log(`${event}: ${filename}`)
})


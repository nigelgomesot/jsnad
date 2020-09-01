'use strict'

// Promises
const { readFile, writeFile } = require('fs').promises
const { join } = require('path')

async function run () {
  const out = await readFile(__filename, { encoding: 'utf-8'})
  const outFile = join(__dirname, 'out.txt')
  await writeFile(outFile, out.toUpperCase())
  console.log('completed.')
}
run().catch(err => console.warn(err.message))

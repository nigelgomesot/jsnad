// REF: https://flaviocopes.com/how-to-spawn-child-process-node/

const fs = require('fs')
const { spawn } = require('child_process')
const filename = 'example12.txt'

fs.watch(filename, () => {
  const child_ls = spawn('ls', ['-lrth', filename])

  child_ls.stdout.pipe(process.stdout)
})

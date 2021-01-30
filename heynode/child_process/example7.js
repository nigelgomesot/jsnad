const { exec } = require('child_process')

// exec example

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err) {
    console.error('exec error occurred:', err.message)

    return
  }

  console.log('Number of files:', stdout)
})

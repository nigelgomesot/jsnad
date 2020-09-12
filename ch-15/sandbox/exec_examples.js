'use strict'

const { exec } = require('child_process')

// split stdio & stderr handling
const exec1 = () => {
  exec(`${process.execPath} -e "console.log('this is normal output'); console.error('this is error')"`,
    (err, stdout, stderr) => {
      console.log('subprocess error:', err)
      console.log('subprocess stdout:', stdout.toString())
      console.warn('subprocess stderr:', stderr.toString())
    }
  )
}
// exec1()

// subprocess error
const exec2 = () => {
  exec(`${process.execPath} -e "console.log('this is normal output'); throw Error('Monkey')"`,
    (err, stdout, stderr) => {
      console.log('subprocess error:', err)
      console.log('subprocess stdout:', stdout.toString())
      console.warn('subprocess stderr:', stderr.toString())
    }
  )
}
exec2()

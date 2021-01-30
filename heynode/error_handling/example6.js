// REF: https://www.valentinog.com/blog/error/#asynchronous-error-handling-in-nodejs-the-callback-pattern

// Node.js Error handling via callback
const { readFile } = require('fs')

const errorHandler = (error) => {
  console.error('error occurred:', error.message)
}
const dataHandler = (data) => {
  console.log('data:', data)
}

const readFileData = (path) => {
  readFile(path, { encoding: 'utf-8'}, (error, data) => {
    if (error)
      return errorHandler(error)
    else
      return dataHandler(data)
  })
}
readFileData('invalid/path')
readFileData('example6.js')

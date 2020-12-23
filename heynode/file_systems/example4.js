// REF: https://heynode.com/tutorial/readwrite-json-files-nodejs

const fs = require('fs')

const jsonFileReader = (filePath, cb) => {
  fs.readFile(filePath, (err, fileData) => {
    if (err)
      return cb(err)

    try {
      const fileJSON = JSON.parse(fileData)
      return cb(null, fileJSON)
    } catch (err) {
      return cb(err, null)
    } finally {
      console.log('jsonFileReader done.')
    }
  })
}

const readCustomerAddress = () => {
  jsonFileReader('./example4.json', (err, customer) => {
    if (err) {
      console.error('error occurred:', err.message)

      return
    }

    console.log('customer address:', customer.address)
  })
}
readCustomerAddress()

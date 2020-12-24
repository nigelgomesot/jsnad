// REF: https://heynode.com/tutorial/readwrite-json-files-nodejs

const fs = require('fs')

// Read JSON from file
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
  jsonFileReader('./example4_read.json', (err, customer) => {
    if (err) {
      console.error('error occurred:', err.message)

      return
    }

    console.log('customer address:', customer.address)
  })
}
//readCustomerAddress()


// Write JSON to file
const jsonFileWriter = (filePath, json, cb) => {
  const jsonData = JSON.stringify(json, null, 2)

  fs.writeFile(filePath, jsonData, cb)
}

const writeCustomerProfile = () => {
  const filePath = './example4_write.json',
        customerProfile = {
          "name": "Mega Corp 2.",
          "order_count": 93,
          "address": "Infinity Loop Drive 2"
        }

  jsonFileWriter(filePath, customerProfile, err => {
    if (err) {
      console.error('error occurred:', err.message)

      return
    }

    console.log('customer profile saved.')
  })
}
writeCustomerProfile()

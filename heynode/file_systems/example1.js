// REF: https://heynode.com/tutorial/what-fs-file-system-module

// relative path
const fs = require('fs')
const path = require('path')

fs.writeFile(
  "./example1.out1",
  "example1 test data",
  err => console.error(err)
)

// dirname based path
fs.writeFile(
  path.join(__dirname, "./example1.out2"),
  "example1 test data",
  err => console.error(err)
)

// REF: https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

// using dotenv

// run: cp env.example .env
// run below commands:
// 1. npm start
// it prints FOO=bar
// 2. NODE_ENV=production npm start
// it prints FOO=undefined

// if (process.env.NODE_ENV != 'production')
//   require('dotenv').config()

console.log(`ENV variable NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`ENV variable FOO: ${process.env.FOO}`)

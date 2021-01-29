// REF: https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

// using dotenv
// if (process.env.NODE_ENV != 'production')
//   require('dotenv').config()

console.log(`ENV variable NODE_ENV: ${process.env.NODE_ENV}`)
console.log(`ENV variable FOO: ${process.env.FOO}`)


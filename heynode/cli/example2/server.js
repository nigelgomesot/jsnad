// REF: https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

const app = require('http').createServer((req, res) => res.send('success'))
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`)
})

// REF: https://www.npmjs.com/package/debug
// REF: https://www.twilio.com/blog/working-with-environment-variables-in-node-js-html

const debug = require('debug')('http'),
      http = require('http'),
      app_name = 'Example 4'

debug('booting %o', app_name)

http.createServer((req, res) => {
  debug(req.method + ': ' + req.url)

  res.end('done \n')
}).listen(3001, () => debug('listening...'))

require('./worker')

// run server:
// DEBUG=* node server.js
// DEBUG=http node server.js
// DEBUG=work:a node server.js
// DEBUG=work:b node server.js

// make request:
//curl http://localhost:3001/

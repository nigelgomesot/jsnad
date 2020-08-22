let result;

// String to Buffer
result = Buffer.from('hello world')
result = '👀'.length
result = Buffer.from('👀').length
result = Buffer.from('👀')
result = Buffer.from('👀', 'utf16le')
result = Buffer.from('A')
result = Buffer.from('A', 'utf16le')
result = Buffer.from('8J+RgA==', 'base64')
result = Buffer.from('👀')

// Buffer to String
const buffer = Buffer.from('👀')

result = buffer
result = buffer.toString()
result = buffer + ''
result = buffer.toString('hex')
result = buffer.toString('base64')

// String decoder to prevent utf-8 encoding errors
const { StringDecoder } = require('string_decoder')
const frag1 = Buffer.from('f09f', 'hex')
const frag2 = Buffer.from('9180', 'hex')
result = frag1.toString()
result = frag2.toString()
const decoder = new StringDecoder()
result = decoder.write(frag1)
result = decoder.write(frag2)

// Buffer to JSON
const buffer2 = Buffer.from('👀')
result = buffer2.toJSON()
result = JSON.stringify(buffer2.toJSON())

// JSON to Buffer
const buffer3 = Buffer.from('👀')
const json = JSON.stringify(buffer3)
result = json
const parsed = JSON.parse(json)
result = parsed
result = Buffer.from(parsed.data)

console.log(result);

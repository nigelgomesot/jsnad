// Export via exports reference

const math = require('./example2_module')

const sum = math.add(1, 2)
console.log('sum (1,2):', sum)

const diff = math.subtract(3, 1)
console.log('diff (3, 1):', diff)

const double = math.double(3)
console.log('double (3):', double)


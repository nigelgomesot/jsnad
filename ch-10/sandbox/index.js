// Throw example

function validateAmount(amount) {
  if (typeof amount !== "number") throw new Error('not a number')
  console.log(`${amount} is valid`)
}
validateAmount(5)
// validateAmount('invalid')

var err = new SyntaxError();
console.log(`err instanceof SyntaxError`, err instanceof SyntaxError)
console.log(`err instanceof Error`, err instanceof Error)
console.log(`err instanceof TypeError`, err instanceof TypeError)


function validateAmountType(amount) {
  if (typeof amount !== "number") throw new TypeError('amount must be a number')
}
//validateAmountType('invalid')

function validateAmountRange(amount) {
  if (amount < 0) throw new TypeError('amount must >= 0')
}
//validateAmountRange(-1)


function validateAmountWithErrorCode(amount) {
  if (amount % 2) {
    const err = new Error('amount mus be even')
    err.code = 'ERR_MUST_BE_EVEN'
    throw err
   }
}
//validateAmountWithErrorCode(3)

class OddError1 extends Error {
  constructor(varName = '') {
    super(`${varName} must be even`)
  }

  get name() {
    return 'OddError1'
  }
}
function validateAmountWithCustomError1(amount) {
  if (amount % 2) {
    throw new OddError1('amount')
   }
}
//validateAmountWithCustomError1(3)

class OddError2 extends Error {
  constructor(varName='') {
    super(`${varName} must be even`)
    this.code = 'ERR_MUST_BE_EVEN'
  }

  get name() {
    return `OddError2: [${this.code}]`
  }
}
function validateAmountWithCustomError2(amount) {
  if (amount % 2) {
    throw new OddError2('amount')
   }
}
//validateAmountWithCustomError2(3)


function validateAmountTryCatch(amount) {
  if (amount % 2) throw new OddError2('amount')
  if (typeof amount !== 'number') throw new TypeError
  if (amount < 0) throw new RangeError
  return amount
}
function run1() {
  try {
    const result = validateAmountTryCatch(3)
    console.log(result);
  } catch(err) {
    switch(err.name) {
      case 'OddError2: [ERR_MUST_BE_EVEN]':
        console.warn('error: amount is odd')
        break;
      case 'TypeError':
        console.warn('error: amount is not a number')
        break;
      case 'RangeError':
        console.warn('error: amount < 0')
        break;
      default:
        console.warn('error: unknown')
    }
  }
}
//run1()

// Error handling with duck-typing
function codifyError(err, code) {
  err.code = code

  return err
}
function validateAmountDuckTyping(amount) {
  if (amount % 2) throw new OddError2('amount')
  if (typeof amount !== 'number')
    throw codifyError(new TypeError, 'ERR_NOT_A_NUMBER')
  if (amount < 0)
    throw codifyError(new RangeError, 'ERR_LESS_THAN_ZERO')
  return amount
}
function run2() {
  try {
    const result = validateAmountDuckTyping(2)
    result()
    console.log(`result: ${result}`)
  } catch (err) {
    switch(err.code) {
      case 'ERR_MUST_BE_EVEN':
        console.warn('error: amount is odd')
        break;
      case 'ERR_NOT_A_NUMBER':
        console.warn('error: amount is not a number')
        break;
      case 'ERR_LESS_THAN_ZERO':
        console.warn('error: amount < 0')
        break;
      default:
        console.warn(`error: unknown ${err.name}`)
    }
  }
}
//run2()

// Error handling with setTimeout
function run3() {
  setTimeout(() => {
    try {
      const result = validateAmountDuckTyping(3)
      console.log(`result: ${result}`)
    } catch (err) {
      switch(err.code) {
        case 'ERR_MUST_BE_EVEN':
          console.warn('error: amount is odd')
          break;
        case 'ERR_NOT_A_NUMBER':
          console.warn('error: amount is not a number')
          break;
        case 'ERR_LESS_THAN_ZERO':
          console.warn('error: amount < 0')
          break;
        default:
          console.warn(`error: unknown ${err.name}`)
      }
    }
  }, 3000)
  console.log('run 3 completed')
}
run3()

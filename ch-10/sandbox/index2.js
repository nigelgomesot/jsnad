// Rejections

class OddError extends Error {
  constructor(varName='') {
    super(`${varName} must be even`)
  }

  get name() {
    return 'OddError'
  }
}

function codifyError(error, code) {
  error.code = code

  return error
}

// Promise based rejections
function validateAmountPromise(amount) {
  return new Promise((resolve, reject) => {
    if (typeof amount != 'number')
      return reject(codifyError(new TypeError('amount must be a number'), 'ERR_MUST_BE_NUMBER'))

    if (amount < 0)
      return reject(codifyError(new RangeError('amount must be > 0'), 'ERR_MUST_BE_POSITIVE'))

    if (amount % 2)
      return reject(codifyError(new OddError('amount'), 'ERR_MUST_BE_EVEN'))

    resolve(amount)
  })
}
function run1() {
  validateAmountPromise(2)
  .then(num => {
    // throw new Error('dummy2')
    console.info(`${num} is valid`)
  })
  .catch(err => {
    switch(err.code) {
      case 'ERR_MUST_BE_NUMBER':
        console.warn('amount must be a number')
        break;
      case 'ERR_MUST_BE_POSITIVE':
        console.warn('amount must be positive')
        break;
      case 'ERR_MUST_BE_EVEN':
        console.warn('amount must be even')
        break;
      default:
        console.warn(`unknown error: ${err.message}`)
    }
  })
}
//run1()

// Async/Await Rejections
async function validateAmount(amount) {
  if (typeof amount != 'number')
    throw new TypeError('amount must be a number')

  if (amount < 0)
    throw new RangeError('amount must be > 0')

  if (amount % 2)
    throw new OddError('amount')

  return amount
}

async function validateAmountAsyncAwait(amount) {
  try {
    const result = await validateAmount(2)
    // throw new Error('dummy')
    console.info(`${result} is valid`)
  } catch(err) {
    if (err instanceof TypeError)
      console.warn('amount must be a number')
    else if (err instanceof RangeError)
      console.warn('amount must be > 0')
    else if (err instanceof OddError)
      console.warn('amount must be even')
    else
    console.warn(`unknown error: ${err.message}`)
  }
}
validateAmountAsyncAwait(3)

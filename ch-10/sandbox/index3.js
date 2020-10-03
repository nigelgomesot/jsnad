// Error Propogation

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

// Callbacks

function validateAmountCallBack(amount, cb) {
  if (typeof amount !== 'number') {
    cb(codifyError(new TypeError(), 'ERR_MUST_BE_NUMBER'))
    return
  }

  if (amount < 0) {
    cb(codifyError(new RangeError(), 'ERR_MUST_BE_POSITIVE'))
    return
  }

  if (amount % 2) {
    cb(codifyError(new OddError(), 'ERR_MUST_BE_EVEN'))
    return
  }

  cb(new Error('dummy'))
  return
  cb(null, amount)
}

function runValidateAmountCallBack(cb) {
  validateAmountCallBack(4, (err, result) => {
    if (result) {
      console.log(`amount: ${result} is valid.`)
      return
    }

    if (err) {
      switch(err.code) {
        case 'ERR_MUST_BE_NUMBER':
          console.warn('amount must be a number')
          break
        case 'ERR_MUST_BE_POSITIVE':
          console.warn('amount must be positive')
          break
        case 'ERR_MUST_BE_EVEN':
          console.warn('amount must be even')
          break
        default:
          cb(err)
      }
    }
  })
}
// runValidateAmountCallBack(err => {
//   if (err)
//     console.warn('Uncaught Error:', err.message)
// })

// Synchronous

function validateAmountSync(amount) {
  if (typeof amount !== 'number')
    throw codifyError(new TypeError(), 'ERR_MUST_BE_NUMBER')

  if (amount < 0)
    throw codifyError(new RangeError(), 'ERR_MUST_BE_POSITIVE')

  if (amount % 2)
    throw codifyError(new OddError(), 'ERR_MUST_BE_EVEN')

  throw new Error('dummy')

  return amount
}
function runValidateAmountSync() {
  try {
    const result = validateAmountSync(4)
    console.log(`amount: ${result} is valid.`)
  } catch (err) {
    switch(err.code) {
      case 'ERR_MUST_BE_NUMBER':
        console.warn('amount must be a number')
        break
      case 'ERR_MUST_BE_POSITIVE':
        console.warn('amount must be a positive')
        break
      case 'ERR_MUST_BE_EVEN':
        console.warn('amount must be even')
        break
      default:
        throw err
    }
  }
}
// try {
//   runValidateAmountSync()
// } catch (err) {
//     console.warn('Uncaught Error:', err.message)
// }

// Async/Await

async function validateAmountAsync(amount) {
  if (typeof amount !== 'number')
    throw codifyError(new TypeError(), 'ERR_MUST_BE_NUMBER')

  if (amount < 0)
    throw codifyError(new RangeError(), 'ERR_MUST_BE_POSITIVE')

  if (amount % 2)
    throw codifyError(new OddError(), 'ERR_MUST_BE_EVEN')

  throw new Error('dummy')

  return amount
}
async function runValidateAmountAsync() {
  try {
    const result = await validateAmountAsync(4)
    console.log(`amount: ${result} is valid.`)
  } catch (err) {
    switch(err.code) {
      case 'ERR_MUST_BE_NUMBER':
        console.warn('amount must be a number')
        break
      case 'ERR_MUST_BE_POSITIVE':
        console.warn('amount must be a positive')
        break
      case 'ERR_MUST_BE_EVEN':
        console.warn('amount must be even')
        break
      default:
        throw err
    }
  }
}
runValidateAmountAsync()
  .catch (err => {
    console.warn('Uncaught Error:', err.message)
  })

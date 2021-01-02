const logComputation = () => {
  const startDate = Date.now()
  let endDate

  do {
    endDate = Date.now()
  } while (endDate - startDate < 5000)

  const message = 'logComputation done.'
  console.log(message)

  return message
}

process.on('message', message => {
  const computeResponse = logComputation()

  process.send(computeResponse)
})

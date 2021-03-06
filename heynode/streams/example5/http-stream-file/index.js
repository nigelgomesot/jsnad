const express = require('express');
const fs = require('fs');

const app = express();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));


app.get('/download', (request, response, next) => {
  const fileStream = fs.createReadStream(`${__dirname}/data/planets.csv`)

  fs.open('open', () => {
    response.attachment(`${Date.now()}_planets.csv`)
    fileStream.pipe(response)
  })

  fileStream.on('error', err => {
    next(err)
  })
})

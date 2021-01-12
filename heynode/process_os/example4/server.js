const express = require('express')
const crypto = require('crypto')

const app = express(),
      port = 3001

const users = []

app.get('/newUser', (req, res) => {
  let username = req.query.username
  const password = req.query.password

  username = username.replace(/[!@#$%^&*]/g, '')

  if (!username || !password || users[username])
    return res.sendStatus(400)

  const salt = crypto.randomBytes(128).toString('base64'),
        hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

  users[username] = { salt, hash }

  res.sendStatus(201)
})

app.get('/auth', (req, res) => {
  let username = req.query.username
  const password = req.query.password

  username = username.replace(/[!@#$%^&*]/g, '')

  if (!username || !password || users[username])
    return res.sendStatus(400)

  const { salt, hash } = users[username]
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512')

  if (crypto.timingSafeEqual(hash, encryptHash))
    res.sendStatus(200)
  else
    res.sendStatus(401)
})

app.listen(port, () => console.log(`app listening at port:${port}`))

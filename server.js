/**
 * entrez la commande suivante:
 * npm install --save express express-session body-parser morgan cors
 * puis node server.js
 * exemple complet à l'adresse
 */

const express = require('express')
const session = require('express-session')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(session({
  secret: 'dca', // changez cette valeur
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ne changez que si vous avez activé le https
}))
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cors())
const path = require('path')
app.use(express.static(path.join(__dirname, 'dist/')))

const users = [{
  // admin by default
  username: 'admin@esiea.fr',
  password: 'dca',
  Firstname: 'admin',
  Lastname: 'admin',
  telNumber: '0606060606',
  licenceNumber: '999',
  country: 'france'
}]

// LOGIN //
app.post('/api/login', (req, res) => {
  if (!req.session.userId) {
    const user = users.find(u => u.username === req.body.email && u.password === req.body.password)
    if (!user) {
      res.json({
        message: 'did not find any user with these credentials'
      })
      res.status(401)
    } else {
      // connect to the user
      req.session.userId = user.username // connect to the user and change the id
      res.json({
        message: 'connected',
        status: 200
      })
      res.status(200)
    }
  } else {
    res.status(401)
    res.json({
      message: 'you are already connected'
    })
  }
})

app.get('/user/me', (req, res) => {
  if (req.session.userId) {
    res.send('ok')
  } else {
    res.status(401).send('not ok')
  }
})

// SUBSCRIBE //
app.post('/api/subscribe', (req, res) => {
  const user = users.find(u => u.username === req.body.email)
  if (!user) {
    users.push({
      username: req.body.email,
      password: req.body.password,
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      telNumber: req.body.telNumber,
      licenceNumber: req.body.licenceNumber,
    })
    res.json({
      message: 'Success'
    })
  } else {
    res.json({
      message: 'An account with this user already exist'
    })
  }
})

// PROFILE INFORMATION //
app.post('/api/profil', (req, res) => {
  const user = users.find(u => u.username === req.body.email)
  if (!user) {
    res.json({
      message: 'did not find any user with this mail'
    })
    res.status(401)
  } else {
    res.json({
      message: 'User informations retrieved',
      status: 200,
      username: user.username,
      Firstname: user.Firstname,
      Lastname: user.Lastname,
      telNumber: req.body.telNumber,
      licenceNumber: req.body.licenceNumber,
    })
    res.status(200)
  }
})

// UPDATE //
app.post('/api/updateprofile', (req, res) => {
  const user = users.find(u => u.username === req.body.username)
  user.telNumber= req.body.telNumber,
  user.licenceNumber= req.body.licenceNumber,
  res.json({
    message: 'profil update !'
  })
})

const port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`listening on ${port}`)
})
// BUILD YOUR SERVER HERE
const express = require('express')
const userModel = require('./users/model')

const server = express()

server.use(express.json())

// GET ALL USERS endpoint
server.get('/api/users', (req, res) => {
  userModel.find()
    .then(users => {
      res.json(users)
    })
    .catch(() => {
      res.status(500).json({
        message: 'The users information could not be retrieved'
      })
    })
})

// GET USER endpoint
server.get('/api/users/:id', (req, res) => {
  let { id } = req.params
  userModel.findById(id)
    .then(user => {
      if(!user) {
        res.status(404).json({
          message: 'The user with the specified ID does not exist'
        })
      } else {
        res.json(user)
      }
    })
    .catch(() => {
      res.status(500).json({
        message: 'The user information could not be retrieved'
      })
    })
})

// POST USER endpoint
server.post('/api/users', (req, res) => {
  let user = req.body // do not destructure!
  if(!user.name || !user.bio) {
    res.status(400).json({
      message: 'Please provide name and bio for the user'
    })
  } else {
    userModel.insert(user)
      .then(newUser => {
        res.status(201).json(newUser)
      })
      .catch(() => {
        res.status(500).json({
          message: 'There was an error while saving the user to the database'
        })
      })
  }
})

// 

module.exports = server

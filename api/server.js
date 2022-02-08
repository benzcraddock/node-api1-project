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


module.exports = server

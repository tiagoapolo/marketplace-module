require('dotenv').config();

const express = require('express')
const app = express()

app.post('*', function (req, res) {
  console.log(req.headers)
  console.log(req.params)
  console.log(req.body)
  res.send('hello')
})

app.get('*', function (req, res) {
  console.log(req.headers)
  console.log(req.params)
  console.log(req.body)
  res.send('hello')
})

app.listen(80)
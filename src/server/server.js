require('dotenv').config();

const express = require('express')
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const auth = require('./api/mercadolivre/auth');

app.get('/auth/url', function (req, res) {
  res.send(auth.meliObject.getAuthURL(process.env.NODE_ML_REDIR_URI))
})

app.get('/auth', function (req, res) {    
  auth.meliObject.authorize(req.query.code, process.env.NODE_ML_REDIR_URI, (err,response) => {   
    if(err){
      res.send(err)
      return;
    }
    res.send(response)
  }) 
})

app.get('/auth/refresh', function (req, res) {    
  auth.meliObject.refreshAccessToken((err,response) => {
    if(err){
      res.send(err)
      return;
    }
    res.send(response)
  }) 
})

app.get('/questions', function (req, res) {    
  auth.meliObject.get('questions/search', {
    item_id: 'MLB1507905089'
  }, (err,response) => { 
    if(err){
      res.send(err)
      return;
    }
    res.send(response)
  }) 
})

app.post('/answers', function (req, res) {    
  auth.meliObject.get('answers',req.body, (err,response) => { 
    if(err){
      res.send(err)
      return;
    }
  
    res.send(response)
  }) 
})

app.post('/webhook', function (req, res) {    
  console.log('req', req.url)
  console.log('req', req.headers)
  console.log('req', req.body)
  res.send('ok')
})

app.post('*', function (req, res) {
  // console.log(req.method, req.path)
  // console.log(req.headers)
  // console.log(req.params)
  // console.log(req.body)
  res.send('hello')
})

app.get('*', function (req, res) {
  // console.log(req.method, req.path)
  // console.log(req.headers)
  // console.log(req.params)
  res.send('hello')
})

const server = app.listen(process.env.PORT, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})
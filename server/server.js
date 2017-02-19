const express = require('express')
const path = require('path')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const database = require('../database/config.js')
const helmet = require('helmet');
const util = require('./server_util');
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const config = require ('../keys').secret;

const app = express()
app.set('secret', config);
app.use(helmet())
app.use(morgan());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
// app.all('*', util.checkUser);
app.use(express.static(path.join(__dirname, '../app/public')));

const router = require('./router.js')(app);

app.get('*', function (request, response){
  response.sendFile(path.resolve(__dirname, '../app/public/index.html'))
})

database.sync()
  .then(res => {
    app.listen(port, function(){
      console.log('Listening on localhost:', port);

    })
  })
  .catch(error => {
    console.log('Database did not sync: ', error);
  })


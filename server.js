'use strict';
// Proxy code found at:
// https://stackoverflow.com/questions/8355473/listen-on-http-and-https-for-a-single-express-app

const
  fs = require('fs'),
  express = require('express'),
  app = express(),
  keys_dir = 'keys/',
  https = require("https"),
  http = require("http"),
  server_options = {
    key : fs.readFileSync(keys_dir + 'teamsnodeprivkey.pem'),
    ca  : fs.readFileSync(keys_dir + 'hcroot.pem'),
    cert: fs.readFileSync(keys_dir + 'teamsnodecert.pem')
  };

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const routes = require('./api/routes/TeamRoute');
routes(app);

https.createServer(server_options,app).listen(3001);
http.createServer(server_options,app).listen(3000);

console.log('Teams RESTful API server started on 3000/3001');


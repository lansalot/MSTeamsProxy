//https://stackoverflow.com/questions/8355473/listen-on-http-and-https-for-a-single-express-app
var
  fs = require('fs'),
  express = require('express'),
  app = express(),
  keys_dir = 'keys/'
  https = require("https"),
  http = require("http"),
  server_options = {
    key : fs.readFileSync(keys_dir + 'teamsnodeprivkey.pem'),
    ca  : fs.readFileSync(keys_dir + 'root.pem'),
    cert: fs.readFileSync(keys_dir + 'teamsnodecert.pem')
  }

bodyParser = require('body-parser');
app.use(bodyParser.json());

var routes = require('./api/routes/TeamRoute');
routes(app);

https.createServer(server_options,app).listen(3001);
http.createServer(server_options,app).listen(3000);

console.log('Teams RESTful API server started on 3000/3001');


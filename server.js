var EventEmitter = require('events').EventEmitter
var messageBus = new EventEmitter()
messageBus.setMaxListeners(100)

var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index');
});

app.get('/messages', function (req, res) {
  var addMessageListener = function(res){
    messageBus.once('message', function(data){
      res.json(data)
    })
  }
  addMessageListener(res)
});

app.post('/messages', function (req, res) {
  console.log(req.body)
  messageBus.emit('message', req.body)
  res.status(200).end()
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

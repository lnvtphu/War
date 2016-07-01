var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

//models
var user =  require('./models/user');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();

//permison for brower
app.all('*',function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    next();
});

router.get('/', function(req, res) {
    res.json({Message: 'Server is running...!'});
});

//get list user

router.get('/listusers', user.viewall);
router.post('/deleteuser', function(req, res){
    console.log(req.body.id);
    res.json({Result: 'ok'});
});

app.use('/', router);

app.listen(port);
console.log('Server running');

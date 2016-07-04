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
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    next();
});

router.get('/', function(req, res) {
    res.json({Message: 'Server is running...!'});
});

//get list user

router.get('/listusers', user.viewall);
router.put('/adduser', user.adduser);
router.post('/updateuser', user.updateuser);
router.delete('/deleteuser', user.deleteuser);
router.post('/deletefriend', user.updatefriend);
router.post('/addfriend', user.updatefriend);

app.use('/', router);

app.listen(port);
console.log('Server running');

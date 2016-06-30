var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var router = express.Router();

app.all('*',function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
    next();
});

router.get('/', function(req, res) {
    res.json({Message: 'Server is running...!'});
});

//get list user

router.get('/listusers', function(req, res){
    var listUser = [{
            "id": "1",
            "firstName": "Tom",
            "lastName": "Cruise",
            "photo": "http://cdn2.gossipcenter.com/sites/default/files/imagecache/story_header/photos/tom-cruise-020514sp.jpg",
            "friends": [2, 3]
        }, {
            "id": "2",
            "firstName": "Maria",
            "lastName": "Sharapova",
            "photo": "http://thewallmachine.com/files/1363603040.jpg",
            "friends": [1]
        }, {
            "id": "3",
            "firstName": "James",
            "lastName": "Bond",
            "photo": "http://georgesjournal.files.wordpress.com/2012/02/007_at_50_ge_pierece_brosnan.jpg",
            "friends": [2]
        }];
        res.json(listUser);
});
router.post('/deleteuser', function(req, res){
    console.log(req.body.id);
    res.json({Result: 'ok'});
});

app.use('/', router);

app.listen(port);
console.log('Server running');

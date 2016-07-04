var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var connectdata = require('../connect_data');
mongoose = connectdata.initialize(mongoose);
var User = new Schema({
    "_id": String,
    "firstName": String,
    "lastName": String,
    "photo": String,
    "friends": []
});
var UserModel = mongoose.model('User', User);
module.exports = {
      viewall: function(req, res){
          var usermodel = UserModel.find({'_id': '1'});
          usermodel.exec(function(err, st){
              console.log(st);
              res.json(st);
          });
      }
}

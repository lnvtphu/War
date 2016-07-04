var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;
var connectdata = require('../connect_data');
mongoose = connectdata.initialize(mongoose);
var UserSchema = new Schema({
    "_id": String,
    "firstName": String,
    "lastName": String,
    "photo": String,
    "friends": []
});
var User = mongoose.model('User', UserSchema);
module.exports = {
      viewall: function(req, res){
          console.log("viewall");
          var usermodel = User.find({}).sort({_id: 1});
          usermodel.exec(function(err, data){
              res.status(200).json(data);
          });
      },
      adduser: function(req, res){
          var idUser = req.body._id;
          if(!idUser){
              res.status(400).json({Error: '_id null'});
              return;
          }
          User.count({_id: idUser}, function(err, count){
             if(err){
                  res.status(500).json(err);
             } else if(count == 0){
                 var user = new User (req.body);
                 user.save(function(err){
                     console.log(err);
                     res.status(201).json({Sucess: 'Create success'});
               });
             }else{
                 res.status(404).json({Error: 'User exist'});
             }
        });
    },
    deleteuser: function(req, res){
        var id = req.body._id;
        User.findOneAndRemove({_id:id}, function(err,data){
            if(err){
                res.status(500).json(err);
            }else if(!data){
                res.status(204).json({Error: 'User with ID: ' + id + 'not exist on data'});
            }else{
                res.status(200).json({Success:'Delete success'});
                }
            }
        );
    },
    updateuser: function(req, res){
          var reqUser = req.body;
          var id = req.body._id;

          if(!id){
              res.status(400).json({Error: 'Id null'});
              return;
          }
          User.findOneAndUpdate(
              {_id: id},
              {
                $set:{
                    firstName: reqUser.firstName,
                    lastName: reqUser.lastName,
                    photo: reqUser.photo
                }
            },
              function(err, data){
                  if(err){
                      res.status(500).json(err);
                  }else{
                      res.status(200).json({Success:'Update success'});
                  }
              }
          );
    },
    updatefriend: function(req, res){
        var id = req.body._id;
        var friendsArr = req.body.friends;
        if(!id){
            res.status(304).json({Error: 'Id null'});
            return;
        }
        User.findOneAndUpdate(
            {_id: id},
            {
              $set:{
                  friends: friendsArr
              }
          },
            function(err, data){
                if(err){
                    res.status(500).json(err);
                }else{
                    res.status(200).json({Success:'Update success'});
                }
            }
        );
    }
}

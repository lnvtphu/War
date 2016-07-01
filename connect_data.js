module.exports.initialize = function(mongoose){
    // mongoose = mongoose.createConnection('mongodb://name:name@ds011800.mlab.com:11800/traintickets');
    mongoose = mongoose.createConnection('mongodb://lnvtphu:123456@ds011745.mlab.com:11745/muser');
    return mongoose;
}

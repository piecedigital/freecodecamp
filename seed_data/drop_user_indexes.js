require('dotenv').load();
var User = require('../models/User.js'),
    mongoose = require('mongoose'),
    secrets = require('../config/secrets'),
    async = require('async');

mongoose.connect(secrets.db);

// Fix Twitter images by removing the user.profile.picture.replace('_normal', '');
// /twimg.*_normal/

//var locals = {};
//test = function () {
//    async.series([
//        function (callback) {
//            User.findOne({}, function(err, users) {
//                if (err) {
//                    console.log('error');
//                    return callback(err);
//                }
//                locals.first = users[0];
//            });
//            console.log(locals.first)
//            callback();
//        },
//        function (callback) {
//            User.findOne({}, function(err, u2) {
//                if (err) return callback(err);
//                console.log('bye');
//            });
//            callback();
//        }
//    ], function (results) {
//        console.log('done');
//    });
//}
//test();
//process.exit(0);


User.find({'profile.picture': /twimg.*_normal/}, function(err, users, done) {
    if (err) { debug('Username err: ', err); next(err); }
    for (var i = 0; i < users.length; i++) {
        console.log(users[i].profile.picture);
        users[i].profile.picture.replace('_normal', '');
        users[i].save(function(err) {
            if (err) { return next(err); }
            done(err, user);
        });
        console.log(users[i].profile.picture);
    }
    process.exit(0);
});

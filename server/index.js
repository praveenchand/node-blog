/*
 * module dependencies
 */
var express = require('express'),
	app     = express(),
	http    = require('http').Server(app),
	passport = require('passport'),
	mongoose = require('mongoose/'),
	GoogleStrategy = require('passport-google').Strategy;

mongoose.connect('mongodb://localhost/myDB');
var Schema = mongoose.Schema;

var userInfo = {
		username : String,
		password : String,
		first_name : String,
		email 	 : String,
		gender   : String,
		oauthID: Number,
		openID : Number
}

var UserDetail = new Schema(userInfo, {collection: 'userInfo'});

var UserDetails = mongoose.model('userInfo',UserDetail);


passport.use(new GoogleStrategy({
  returnURL: 'http://localhost:300/auth/google/return',
  realm: 'http://localhost:300/'
},
function(identifier, profile, done) {
	UserDetails.findOrCreate({ openID: identifier }, function(err, user) {
		
	if(err){
		return done(err);
	}
	if(user){
		return done(null,user);
	}else{
		var newUser  = new UserDetails();
        newUser.openID    = profile.id;
        newUser.username  = profile.displayName;
        newUser.email = profile.emails[0].value; // pull the first emails
        
        newUser.save(function(err){
        	if(err)
        		throw err;
        	return done(null,newUser);
        })
	}
		
    done(err, user);
  });
}
));


app.set('port',process.env.PORT || 300);
app.use(express.static(__dirname + './../public'));


require('./router')(app);

http.listen(app.get('port'),function(){
	console.log('started listening');
})
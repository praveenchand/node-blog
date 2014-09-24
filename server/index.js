/*
 * module dependencies
 */
var express = require('express'),
	app     = express(),
	http    = require('http').Server(app),
	passport = require('passport'),
	mongoose = require('mongoose/'),
	GoogleStrategy = require('passport-google').Strategy,
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/storage');
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

passport.serializeUser(function(user, done) {
	 console.log('serializeUser: ' + user._id)
	 done(null, user._id);
	});
passport.deserializeUser(function(id, done) {
	UserDetails.findById(id, function(err, user){
     if(!err) done(null, user);
     else done(err, null)
 })
});



passport.use(new LocalStrategy(
		  function(username, password, done) {
			  UserDetails.findOne({ username: username }, function(err, user) {
		      if (err) { return done(err); }
		      if (!user) {
		        return done(null, false, { message: 'Incorrect username.' });
		      }
		      if (!user.validPassword(password)) {
		        return done(null, false, { message: 'Incorrect password.' });
		      }
		      return done(null, user);
		    });
		  }
));



passport.use(new GoogleStrategy({
  returnURL: 'http://localhost:300/auth/google/return',
  realm: 'http://localhost:300/'
},
function(identifier, profile, done) {
	UserDetails.findOne({ openID: profile.id }, function(err, user) {
		
	if(err){
		return done(err);
	}
	if(user){
		console.log(user);
		return done(null,user);
	}else{
		var newUser  = new UserDetails({
			openID: profile.id,
			username: profile.displayName,
			email: profile.emails[0].value
		});
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
app.set('views', __dirname + './../public/views');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());



require('./router')(app);

http.listen(app.get('port'),function(){
	console.log('started listening');
})
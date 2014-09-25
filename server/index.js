/*
 * module dependencies
 */
var express = require('express'),
	app     = express(),
	http    = require('http').Server(app),
	passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    UserDetails = require('./users.js'),
    path = require('path'),
    flash    = require('connect-flash');

passport.serializeUser(function(user, done) {
	 console.log('serializeUser: ' + user._id)
	 done(null, user._id);
	});

passport.deserializeUser(function(id, done) {
	UserDetails.findById(id, function(err, user){
		console.log(user);
     if(!err) done(null, user);
     else done(err, null)
 })
});



app.set('port',process.env.PORT || 300);
app.use(express.static(__dirname + './../public'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(session({ secret: 'keyboard cat' }));
app.use(passport.initialize());
app.use(passport.session());



require('./router')(app);
require('./authenticate')();

http.listen(app.get('port'),function(){
	console.log('started listening'+http.address().port);
})
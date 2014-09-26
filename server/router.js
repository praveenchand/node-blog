
var passport = require('passport');
UserDetails = require('./users.js');

module.exports  = function router(app){
	
/*	app.get('/', function(req,res){
		res.render('layout');
	});
	
	app.get('views/signin', function(req,res){
		res.render('signin.jade');
	});*/

	app.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
	
	app.get('/auth/facebook',
			  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
			);
	
	app.get('/auth/twitter', passport.authenticate('twitter'));
	
	app.get('/auth/info',function(req,res){
		if(req.session.passport.user !== null){
			var id = req.session.passport.user;
			UserDetails.findById(id, function(err, user){
			     if(err) res.status(500).json({error:"not authorized"});
			     else res.json(user);
			});
		}
	});

	
/*	app.get('/api/me', 
			  passport.authenticate('local-signin', { session: false }),
			  function(req, res) {
			    res.json(req.user);
			  });*/
	
	
	app.get('/auth/google/return', 
			  passport.authenticate('google', { successRedirect: '/',
			                                    failureRedirect: '/' }));
	
	app.get('/auth/facebook/callback', 
			  passport.authenticate('facebook', { successRedirect: '/',
			                                      failureRedirect: '/' }));
	
	app.get('/auth/twitter/callback', 
			  passport.authenticate('twitter', { successRedirect: '/',
			                                     failureRedirect: '/' }));
	
	app.post('/login',
			  passport.authenticate('local-signin', { successRedirect: '/profile',
			                                   failureRedirect: '/signin',
			                                   failureFlash : true }));
	
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile', // redirect to the secure profile section
		failureRedirect : '#/signup', // redirect back to the signup page if there is an error
		failureFlash : true // allow flash messages
	}));
	
	app.get('/logout', function(req, res){
		  req.logout();
		  res.redirect('/');
		});
	
}

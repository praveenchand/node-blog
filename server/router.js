
var passport = require('passport');

module.exports  = function router(app){
	

	app.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
	
	app.get('/auth/facebook',
			  passport.authenticate('facebook', { scope: ['read_stream', 'publish_actions'] })
			);
	
	app.get('/auth/twitter', passport.authenticate('twitter'));

	
	app.get('/auth/google/return', 
			  passport.authenticate('google', { successRedirect: '/',
			                                    failureRedirect: '/' }));
	
	app.get('/auth/facebook/callback', 
			  passport.authenticate('facebook', { successRedirect: '/',
			                                      failureRedirect: '/' }));
	
	app.get('/auth/twitter/callback', 
			  passport.authenticate('twitter', { successRedirect: '/',
			                                     failureRedirect: '/' }));
	
	app.get('/logout', function(req, res){
		  req.logout();
		  res.redirect('/');
		});
	
}

var passport = require('passport')

module.exports  = function router(app){
	
	
	// Redirect the user to Google for authentication.  When complete, Google
	// will redirect the user back to the application at
	//     /auth/google/return
	app.get('/auth/google', passport.authenticate('google',{scope:['profile','email']}));
	
	app.get('/auth/google/return', 
			  passport.authenticate('google', { successRedirect: '/success',
			                                    failureRedirect: '/' }));
	
	
	//app.get('*', function(req, res) { res.render('404', { title: 'Page Not Found'}); });
}
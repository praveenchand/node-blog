var passport = require('passport'),
 FacebookStrategy = require('passport-facebook').Strategy,
 TwitterStrategy = require('passport-twitter').Strategy,
 GoogleStrategy = require('passport-google').Strategy,
 config = require('./oauth.js'),
 UserDetails = require('./users.js'),
 LocalStrategy = require('passport-local').Strategy;




module.exports = function authenticate(){
	passport.use(new FacebookStrategy({
		  clientID: config.facebook.clientID,
		  clientSecret: config.facebook.clientSecret,
		  callbackURL: config.facebook.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			UserDetails.findOne({ oauthID: profile.id }, function(err, user) {
		  if(err) { console.log(err); }
		  if (!err && user != null) {
		    done(null, user);
		  } else {
		    var user = new UserDetails({
		      oauthID: profile.id,
		      name: profile.displayName,
		      created: Date.now()
		    });
		    user.save(function(err) {
		      if(err) {
		        console.log(err);
		      } else {
		        console.log("saving user ...");
		        done(null, user);
		      };
		    });
		  };
		});
		}
		));

		passport.use(new TwitterStrategy({
		 consumerKey: config.twitter.consumerKey,
		 consumerSecret: config.twitter.consumerSecret,
		 callbackURL: config.twitter.callbackURL
		},
		function(accessToken, refreshToken, profile, done) {
			UserDetails.findOne({ oauthID: profile.id }, function(err, user) {
		 if(err) { console.log(err); }
		 if (!err && user != null) {
		   done(null, user);
		 } else {
		   var user = new UserDetails({
		     oauthID: profile.id,
		     name: profile.displayName,
		     created: Date.now()
		   });
		   user.save(function(err) {
		     if(err) {
		       console.log(err);
		     } else {
		       console.log("saving user ...");
		       done(null, user);
		     };
		   });
		 };
		});
		}
	));
		
	passport.use(new GoogleStrategy({
		  returnURL: config.google.returnURL,
		  realm: config.google.realm
		},
		function(identifier, profile, done) {
			UserDetails.findOne({ openID: profile.id }, function(err, user) {
				
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
	
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
        UserDetails.findOne({ 'email' :  email }, function(err, user) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {

				// if there is no user with that email
                // create the user
                var newUser            = new UserDetails();

                // set the user's local credentials
                newUser.email    = email;
                newUser.password = password; // use the generateHash function in our user model
				// save the user
                newUser.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }
        });

    }));


	
    passport.use('local-signin', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
        if (email)
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching

        // asynchronous
            UserDetails.findOne({ 'email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));

                if (user.password !== password)
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                // all is well, return user
                else
                    return done(null, user);
            });

    }));

		
}
	

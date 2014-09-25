var OAuth = {
		"facebook":{
			clientID:"777302065644562",
			clientSecret:"2b72e62b2c2010b1ae9e9fc6941bb559",
			callbackURL:"http://localhost:300/auth/facebook/callback"
		},
		"google":{
			returnURL:"http://localhost:300/auth/google/return",
			realm: "http://localhost:300"
		},
		"twitter":{
			consumerKey:"5Gxg5gHOfLdByQXSCvaC5giXR",
			consumerSecret:"krPuGB2H5AdrCOOJZ7zw3zOZXCeFC4Yleoo8mSw06bOsKgbdh2",
			callbackURL:"http://localhost:300/auth/twitter/callback"
		}
}

module.exports = OAuth;
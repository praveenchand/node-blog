var	mongoose = require('mongoose/');

mongoose.connect('mongodb://localhost/storage');
var Schema = mongoose.Schema;

var userInfo = {
		username : String,
		password : String,
		first_name : String,
		email 	 : String,
		gender   : String,
		oauthID: Number,
		openID : Number,
		created : String
}

var UserDetail = new Schema(userInfo, {collection: 'userInfo'});

var UserDetails = mongoose.model('userInfo',UserDetail);


module.exports = UserDetails;
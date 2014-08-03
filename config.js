module.exports = {
	production: {
		db: 'mongodb://RhythmMongo:674lkeWVk8UVVpHXyTgf3RSeX1DPLDrOtoTJ.7.t4iQ-@ds048537.mongolab.com:48537/RhythmMongo', // MongoDB connection string, ex: mongodb://db-user:db-password@mongo.onmodulus.net:27017/1234567
		fitbitClientKey: '250a5dd376f6430eb877414d519e841b', // Your Fitbit application information found at https://dev.fitbit.com/apps
		fitbitClientSecret: '91ffb59260064b9bb91721bdca70fa85',
		host: 'rhythmoauth.azurewebsites.net', // The hostname where this application is available publicly, ex: fitbitexample-9501.onmodulus.net
		twilioAccountSid: 'TODO', // Found on your Twilio account page: https://www.twilio.com/user/account
		twilioAuthToken: 'TODO',
		twilioPhoneNumber: 'TODO' // The Twilio number that SMS will be sent from, ex: +14152363281
	}
};
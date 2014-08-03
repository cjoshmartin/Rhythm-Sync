console.log("Rhyhm Sync Starting");

/**
 * Module dependencies.
 */
var env = process.env.NODE_ENV || 'production',
	config = require('./config')[env];

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , OAuth = require('oauth')
	, passport = require('passport')
	, mongoose = require('mongoose');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('Rhythm Sync'));
  app.use(express.session());
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

// Connect to database and initialize model
mongoose.connect(config.db);
require('./models/user');

// Initialize controllers
var IndexController = require('./controllers/index'),
	FitbitAuthController = require('./controllers/fitbit-auth'),
	FitbitApiController = require('./controllers/fitbit-api');

// Define routes
// Index and Notification routes
app.get('/', IndexController.index);
app.get('/phone', IndexController.showUser);
app.post('/phone', IndexController.saveUser);
app.post('/notifications', FitbitApiController.notificationsReceived);
// OAuth routes
app.get('/auth/fitbit', passport.authenticate('fitbit'));
app.get('/auth/fitbit/callback', passport.authenticate('fitbit', { failureRedirect: '/?error=auth_failed' }),
	function(req, res) {
		// Successful authentication, redirect home.
		res.redirect('/phone');
	}
);

//app.get('/', routes.index);
//app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

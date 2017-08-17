// Webshop App

const express = require( 'express' ),
	pg = require( 'pg' ),
	Sequelize = require( 'sequelize' ),
	bodyParser = require( 'body-parser' ),
	session = require( "express-session" ),
	bcrypt = require( 'bcrypt' ),
	saltRounds = 10,
	port = process.env.PORT || 8000

const app = express();

// Configuring app 

app.use( bodyParser.urlencoded( { extended: true } ) );
app.use( express.static( __dirname + '/public' ) );
app.use( session( {
	secret: "whatever",
	store: new SequelizeStore( {
		db: db,
		checkExpirationInterval: 15 * 60 * 1000, 
		expiration: 24 * 60 * 60 * 1000 
	} ),
	saveUnitialized: true,
	resave: true
} ) );

// Setting view engine

app.set( "views", "./views" );
app.set( "view engine", "pug" );

// Configuring db

db = new Sequelize( "webshop_app", process.env.POSTGRES_USER, process.env.POSTGRES_PASSWORD, {
	host: "localhost",
	dialect: "postgres",
	define: {
		timestamps: true,
		notNull: false
	}
} );

// Establishing DB Connection

db.sync( { force: false } )

// Defining models: User and Event

const User = db.define( "user", {
	first: {
		type: Sequelize.STRING
	},
	last: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	username: {
		type: Sequelize.STRING
	},
	password: {
		type: Sequelize.STRING
	}
} );

const Event = db.define( "event", {
	type: {
		type: Sequelize.STRING
	},
	amount: {
		type: Sequelize.INTEGER
	},
	product: {
		type: Sequelize.STRING
	}
} );

// Defining relations

User.hasMany( Event );
Event.belongsTo( User );

// GET

app.get( "/", ( req, res ) => {

} );

app.get( "/signin", ( req, res ) => {

} );

app.get( "/signup", ( req, res ) => {

} );

app.get( "/checkout", ( req, res ) => {
	let user = req.session.user;
	res.redirect( '/checkout' + user.id );
} );

// Dynamic route

app.get( "/checkout/:id", ( req, res ) => {
	let user = req.session.user;
}

// POST

app.post( "/signin", ( req, res ) => {

} );

app.post( "/signup", ( req, res ) => {
	
} );

app.post( "/checkout", (req, res) => {

});

// server launch

app.listen( port, function( res ) {
	console.log( "App listening in port " + port )
} )
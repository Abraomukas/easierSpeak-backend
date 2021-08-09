const express = require("express");
const cors = require("cors");
const expressFormData = require("express-form-data");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;
const passport = require("passport");
// imports for JWT
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;
const passportJwtConfig = {
	jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	secretOrKey: jwtSecret,
};

// read the payload of the JWT
const passportJwt = (passport) => {
	// configure passport to use passport-jwt
	passport.use(
		new JwtStrategy(passportJwtConfig, (jwtPayload, done) => {
			// find and extract the user by their id, which is inside the JWT
			HumansModel.findOne({ _id: jwtPayload.id })
				.then(
					// if the document is found
					(dbDocument) => {
						return done(null, dbDocument);
					}
				)
				.catch((error) => {
					return done(null, null);
				});
		})
	);
};

passportJwt(passport);

const membersRoutes = require("./routes/members");
const clubsRoutes = require("./routes/clubs");

const server = express();
// read HTTP's body
server.use(express.urlencoded({ extended: false }));
server.use(express.json());
// read form data
server.use(expressFormData.parse());
// allow Cross-Origin resource sharing
server.use(cors());

// connect to MongoDB
const db_connection = process.env.DB_CONNECTION;
const conn_config = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};

mongoose
	.connect(db_connection, conn_config)
	.then(() => {
		console.log("Connection to MongoDB successful!");
	})
	.catch((error) => {
		console.log("MongoDB error!", error);
	});

// configuration for Cloudinary
cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// all requests that go through .../members/
server.use("/members", membersRoutes);

// all requests that go through .../clubs/
server.use("/clubs", clubsRoutes);

// homepage
server.get("/", (res) => {
	res.send("Hello Word!");
});

server.listen(process.env.PORT || 3001, () => {
	console.log("easierSpeak is live on http://localhost:3001");
});

const express = require("express");
const cors = require("cors");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const membersRoutes = require("./routes/Members");
const clubsRoutes = require("/routes/Clubs");

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

const express = require("express");
const router = express.Router();

const ClubsModels = require("../models/Clubs");

// ...clubs/find
router.get("/find", (req, res) => {
	ClubsModels.find({
		name: req.body.name,
	})
		.then((dbDocument) => {
			res.send(dbDocument);
		})
		.catch((error) => {
			console.log("Mongoose error!", error);
			res.send(error);
		});
});

module.exports = router;

const express = require("express");
const router = express.Router();

const MembersModels = require("../models/Members");

// ...members/find
router.get("/find", (req, res) => {
	MembersModels.find({
		username: req.body.username,
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

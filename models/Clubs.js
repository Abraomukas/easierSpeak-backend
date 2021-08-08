const mongoose = require("mongoose");

const ClubsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	members: {
		type: Array,
	},
	accolades: {},
});

const ClubsModel = mongoose.model("Clubs", ClubsSchema);

module.exports = ClubsModel;

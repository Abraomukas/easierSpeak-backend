const mongoose = require("mongoose");

const MembersSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
	},
	avatar: {
		type: String,
	},
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	nameVisibility: {
		type: Boolean,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	location: {
		type: String,
	},
	phone: {
		type: String,
	},
	phoneVisibility: {
		type: Boolean,
		required: true,
	},
	defaultLng: {
		type: String,
	},
});

const MembersModel = mongoose.model("Members", MembersSchema);

module.exports = MembersModel;

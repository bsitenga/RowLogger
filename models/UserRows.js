const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const UserRowsSchema = new Schema({
	email: {
		type: String,
		required: true
	},
	rows: {
		type: Array,
		required: true
	}
});
module.exports = UserRows = mongoose.model('userrows', UserRowsSchema);

const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const UserSchema = new Schema({
  userType: {
    type: String,
    default: "rower",
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
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
  date: {
    type: Date,
    default: Date.now,
  },
  pro: {
    type: Number,
    default: 0,
  },
  rows: {
    type: [[]],
    default: [],
  },
  folders: {
    type: [String],
    default: ["Single Distances", "Single Times", "Intervals: Distance", "Intervals: Time"],
  },
  organizations: {
	  type: [String],
	  default: []
  }
});
module.exports = User = mongoose.model("users", UserSchema);

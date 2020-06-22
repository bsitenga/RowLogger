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
    required: true,
  },
  rows: {
    type: Array,
    default: [],
  },
  folders: {
    type: Array,
    default: ["Single Distances", "Single Times", "Intervals: Distance", "Intervals: Time"],
    required: true,
  },
  organizations: {
	  type: Array,
	  default: []
  }
});
module.exports = User = mongoose.model("users", UserSchema);

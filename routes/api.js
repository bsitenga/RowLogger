const express = require('express');
const router = express.Router();
const User = require('../models/User');
const UserRows = require('../models/UserRows');

//gets all rows from all users
router.get('/userrows', (req, res, next) => {
	UserRows.find({}).then((data) => res.json(data)).catch(next);
});

//Creates a new row array for a new user
router.post('/userrowsnew', (req, res, next) => {
	UserRows.create(req.body).then((data) => res.json(data)).catch(next);
});

//Creates a new row for a specific user
// router.post('/userrows', (req, res, next) => {
// 	UserRows.update({ email: req.body.email }, { $push: { rows: req.body.row } })
// 		.then((data) => res.json(data))
// 		.catch(next);
// });

//Gets all uers
router.get('/users', (req, res, next) => {
	User.find({}).then((data) => res.json(data)).catch(next);
});

//gets a specific user
router.get('/users/specific', (req, res, next) => {
	User.find({ email: req.body.email, password: req.body.password }).then((data) => res.json(data)).catch(next);
});

//Creates a new user
router.post('/users', (req, res, next) => {
	User.create(req.body).then((data) => res.json(data)).catch(next);
});

router.post('/userrows', (req, res, next) => {
	User.findOneAndUpdate({ email: req.body.email }, {$push: {rows: req.body.row}})
	.then((data) => res.json(data))
	.catch(next);
});

module.exports = router;

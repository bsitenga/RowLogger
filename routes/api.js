const express = require ('express');
const router = express.Router();
const Todo = require('../models/todo');
const User = require('../models/User');
const UserRows = require('../models/UserRows');

router.get('/userrows', (req, res, next) => {
  UserRows.find({})
  .then(data => res.json(data))
  .catch(next)
})

router.post('/userrowsnew', (req, res, next) => {
  UserRows.create(req.body)
  .then (data => res.json(data))
  .catch(next)
})

router.post('/userrows', (req, res, next) => {
  UserRows.update({ email: req.body.email},
    { $push: {rows: req.body.row}})
    .then(data => res.json(data))
    .catch(next)
})

router.get('/users', (req, res, next) => {
  User.find({})
  .then(data => res.json(data))
  .catch(next)
})

router.get('/users/specific', (req, res, next) => {
  User.find({email: req.body.email, password: req.body.password})
  .then(data => res.json(data))
  .catch(next)
})

router.post('/users', (req, res, next) => {
  User.create(req.body) 
    .then (data => res.json(data))
    .catch(next)
});

router.get('/todos', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  Todo.find({}, 'action')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/todos', (req, res, next) => {
  if(req.body.action){
    Todo.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/todos/:id', (req, res, next) => {
  Todo.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;

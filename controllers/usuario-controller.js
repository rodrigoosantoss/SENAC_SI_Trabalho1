const User = require('../models/usuario');


exports.getUsers = (req, res) => {
  User.find({}, (err, users) => {
    if(err) {
      res.status(500).send(err);
    }
    res.json(users);
  })
}

exports.getUserById = (req, res) => {
  const id = req.params.id;
  
  User.findById(id, (err, user) => {
    if (err) {
      res.send(err);
    }
    if (user) {
      res.json(user)
    }
    else {
      res.status(404).json({error: 'User not found'});
    }
  })
}

exports.createUser = (req, res) => {
  let newUser = new User(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  
  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(newUser)
  })
}

exports.editUser = (req, res) => {
  const id = req.params.id;
  const userToUpdate = req.body;
  
  if(req.body.password) {
    userToUpdate.password = bcrypt.hashSync(req.body.password, 10);
  }
  
  User.findByIdAndUpdate(id, userToUpdate, { new:true }, 
    (err, updatedUser) => {
      if (err) {
        res.send(err);
      }
      if (updatedUser) {
        res.json(updatedUser)
      }
      else {
        res.status(404).json({error: 'User not found'});
      }
   }
  )
}

exports.deleteUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndDelete(id, (err, deletedUser) => {
    if (err) {
      res.send(err);
    }
    if (deletedUser) {
      res.json(deletedUser)
    }
    else {
      res.status(404).json({error: 'User not found'});
    }
  })
}

exports.searchUser = (req, res) => {
  if (req.query && req.query.username) {
    const paramUsername = req.query.username;
    
    User.find({username: paramUsername}, (err, user) => {
      if(err) {
        res.status(500).send(err);
      }
      if(user) {
        res.json(user);
      }
      else {
        res.status(404).json({error: 'User not found'});
      }
    })
  }
  else {
    res.status(400).send({error: 'Username param missing'});
  }
}


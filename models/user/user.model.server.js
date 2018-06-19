var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('UserModel', userSchema);

function findUserByCredentials(credentials) {
  console.log(credentials);
  return userModel.findOne(credentials, {username: 1, password: 1, email: 1, firstName: 1, lastName: 1});
}

function findUserById(userId) {
  return userModel.findById(userId);
}

function createUser(user) {
  return userModel.create(user);
}

function findAllUsers() {
  return userModel.find();
}

function updateUser(user) {
  console.log(user);
    let u = userModel.updateOne({_id: user._id}, user);
    return u;
}

var api = {
  createUser: createUser,
  findAllUsers: findAllUsers,
  findUserById: findUserById,
  findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,

};

module.exports = api;
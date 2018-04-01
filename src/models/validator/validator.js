const validator = require('validator');
const BSON = require('bson');

module.exports.isName = function (_name) {
  return validator.isAlpha(_name);
}

module.exports.isEmail = function (_email) {
  return validator.isEmail(_email);
}

module.exports.isObjectId = function (_objectId) {
  return BSON.ObjectID.isValid(_objectId);
}

module.exports.getTimestamp = function (_objectId) {
  let object = BSON.ObjectId(_objectId)
  return object.getTimestamp();
}
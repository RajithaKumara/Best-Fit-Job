const BSON = require('bson');

module.exports.getTimestamp = function (_objectId) {
  let object = BSON.ObjectId(_objectId)
  return object.getTimestamp();
}
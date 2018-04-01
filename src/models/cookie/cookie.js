const Cookies = require('js-cookie');

exports.set = function (name, value) {
  return Cookies.set(name, value);
}

exports.get = function (name) {
  let cookie = Cookies.get(name);
  return JSON.parse(cookie);
}

exports.remove = function (name) {
  return Cookies.remove(name);
}

exports.isSet = function (name) {
  let cookie = Cookies.get(name);
  if (cookie != undefined) {
    return true;
  }
  return false;
}
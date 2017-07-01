'use strict';

var randomNatural = require('random-natural');

module.exports = function (options) {
  var int   = randomNatural(options);
  var octal = int.toString(16);

  return '0x' + octal;
};

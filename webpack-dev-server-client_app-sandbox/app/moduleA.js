'use strict'

var myA = function() { return 'aAAA'; }

module.exports = myA;

if (module.hot) {
  module.hot.accept();
}

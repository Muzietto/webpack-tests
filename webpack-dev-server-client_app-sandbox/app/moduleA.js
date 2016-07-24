'use strict'

var myA = function() { return 'a'; }

module.exports = myA;

if (module.hot) {
  module.hot.accept();
}

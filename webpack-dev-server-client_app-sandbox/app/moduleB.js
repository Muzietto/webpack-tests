'use strict'

function myB() { return 'b'; }

module.exports = myB;

if (module.hot) {
  module.hot.accept();
}

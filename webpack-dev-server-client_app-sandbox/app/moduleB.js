'use strict'

var myB = 'b';

module.exports = myB;

if (module.hot) {
  module.hot.accept();
}

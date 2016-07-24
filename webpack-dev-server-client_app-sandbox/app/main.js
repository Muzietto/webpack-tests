'use strict'

var a = require('./moduleA');
var b = require('./moduleB');  
  
function clickMe() {
  alert(a() + b() + "-test");
}

document.getElementById('theButton').onclick = clickMe;

if (module.hot) {
  module.hot.accept('./moduleA', function() { 
    a = require('./moduleA');
  });
  module.hot.accept('./moduleB', function() { 
    b = require('./moduleB');
  });
}

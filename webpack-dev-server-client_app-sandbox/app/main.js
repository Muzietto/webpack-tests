var a = require('./moduleA');
var b = require('./moduleB');  
  
function cliccami() {
  alert(a + b + "-test");
}

document.getElementById('theButton').onclick = cliccami;
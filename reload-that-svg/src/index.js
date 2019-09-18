
console.log('got it');
console.log('got it');

$('#main').css({
  border: '3px dashed red',
});

setTimeout(() => {
  $('#london text').text('No longer London');
},1000);

// if we want to manipulate svg elements we gotta load https://github.com/kbwood/svg
setTimeout(() => {
  $('#paris').css({ border: '3px solid red' });
},2000);

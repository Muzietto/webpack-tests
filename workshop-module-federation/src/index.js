import loadDependenciesAndExecute from './asynchronous';

loadDependenciesAndExecute();

setTimeout(() => {
  console.log('jQuery plugin is ', window.jQuery.fn.greenify);
}, 500);

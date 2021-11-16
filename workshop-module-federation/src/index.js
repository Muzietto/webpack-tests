import loadDependenciesAndExecute from './asynchronous';

loadDependenciesAndExecute();

setTimeout(() => {
  console.log('jQuery greenify plugin is ', window.jQuery.fn.greenify);
}, 500);

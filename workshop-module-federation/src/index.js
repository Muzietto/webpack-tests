// import $ from 'jquery';

import('module-federation-mfe/greetingInRootDiv')
  .then(({ default: greetingInRootDiv }) => {
    import('jquery')
      .then(({ default: $ }) => {
        debugger;
        console.log('CIP');
        greetingInRootDiv($('#shellRoot'), 'SHELL - please check $.fn in the console');
      })

  })
  .catch(err => { debugger; })

// greetingInRootDiv($('#shellRoot'), 'SHELL - please check $.fn in the console');

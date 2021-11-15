
export default async function EXECUTE() {
  
  const { default: greetingInRootDiv } = await import('module-federation-mfe/greetingInRootDiv');
  const { default: $ } = await import('jquery');

  greetingInRootDiv($('#shellRoot'), 'SHELL - please check window.jQuery.fn.greenify in the console');

  window.jQuery = $;
}

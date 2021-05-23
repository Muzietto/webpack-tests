import $ from 'jquery';
import '@src/style.css';

export default greetingInRootDiv;

function greetingInRootDiv() {
  $('#root')
    .addClass('hello')
    .html('Welcome, friend Webpack');
}

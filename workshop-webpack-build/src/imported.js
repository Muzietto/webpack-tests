import $ from 'jquery';
import '@src/style.css';

// TODO - add here a jQuery plugin

export default greetingInRootDiv;

function greetingInRootDiv($div = $('#root'), message = '') {
  $div
    .addClass('hello')
    .html('Welcome, friend Webpack from ' + message);
}

import $ from 'jquery';
import '@src/style.css';

$.fn.greenify = function() {
    this.css('color', 'green');
};

export default greetingInRootDiv;

function greetingInRootDiv($div, message = '') {
  $div
    .addClass('hello')
    .html('Welcome, friend Webpack from ' + message);
}

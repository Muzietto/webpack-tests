import $ from 'jquery';
import './style.css';

$('#root')
  .addClass('hello')
  .html('Welcome, friend Webpack');

console.log('ENV=', ENV);

// uncomment next lines to see DefinePlugin at work
// eslint-disable-next-line no-undef
// console.log('ENV2=', ENV2);

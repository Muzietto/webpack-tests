import $ from 'jquery';
import greetingInRootDiv from '@src/imported';

greetingInRootDiv($('#root'), 'MICROFRONTEND');

// eslint-disable-next-line no-undef
console.log('ENV2=', ENV2);

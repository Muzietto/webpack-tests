import greetingInRootDiv from '@src/imported';

greetingInRootDiv();

console.log('ENV=', ENV);

// eslint-disable-next-line no-undef
console.log('ENV2=', ENV2);

// feature from ECMAScript 9
const one = { a: 12, b: true };
const augmented = { ...one, c: 'hello' };
console.log('augmented=', augmented);

// feature from ECMAScript 10 --> MUST POLYFILL PROTOTYPE METHODS YOURSELF!!!
const flatMapped = [[1], [2], [3]].flatMap(x => 2 * x);
console.log('flatMapped=', flatMapped);

// feature from ECMAScript 11
const coalescedNull = null ?? 'myString';
console.log('coalescedNull=', coalescedNull);

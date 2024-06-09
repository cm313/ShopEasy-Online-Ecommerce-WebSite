import {formatCurrency} from '../Scripts/utils/money.js';

// below statment is the name for below group of related test cases
// group of related test cases called as "test suite"
console.log('test suite: formatCurrency');

// below statment is the name for the below test case
console.log('converts cents into dollars');

if(formatCurrency(2095) === '20.95') {
    console.log('passed');
} else {
  console.log('failed');
}

// below statment is the name for the below test case
console.log('works with 0');

if(formatCurrency(0) === '0.00'){
   console.log('passed');
} else {
  console.log('failed');
}

// below statment is the name for the below test case
console.log('round up to the nearest integer');

if(formatCurrency(2000.5) === '20.01') {
  console.log('passed');
} else {
  console.log('failed');
}
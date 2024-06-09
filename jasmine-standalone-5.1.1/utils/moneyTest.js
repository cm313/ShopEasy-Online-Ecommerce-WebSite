import {formatCurrency} from '../Scripts/utils/money.js';

//In jasime for creating a "test suite" we use a describe() function
// Note: we can use a describe() function inside a describe() function

describe('test suite: formatCurrency', () =>{
 it('converts cents into dollars', () => {
  // expect() function is used to comapre to values in Jasmine
  // here, expect() function gives us a object and it conatins a method called toEqual();
  expect(formatCurrency(2095)).toEqual('20.95');
 });

 it('works with 0', () =>{
  expect(formatCurrency(0)).toEqual('0.00');
 });

 it('rounds up to the nearest cent', ()=>{
  expect(formatCurrency(2000.5)).toEqual('20.01');
 })
});
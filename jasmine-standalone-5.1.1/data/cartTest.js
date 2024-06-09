import {addToCart, cart, loadFromStorage} from '../../data/cart.js';

describe('test suite: addToCart', () =>{
   it('adds an existing product to the cart', ()=>{

   });

   it('adds a new product to the cart', ()=>{
      // we are going to create a mock using another function of jasmine called spyOn();
      spyOn(localStorage, 'setItem');
      
      spyOn(localStorage, 'getItem').and.callFake(() =>{
            //object         method
            /* This replace the localStorage.getItem with a fake version, and we can make this fake version
            do any thing we want to do */
        return JSON.stringify([]);
      });
      loadFromStorage();
       
       addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
       expect(cart.length).toEqual(1);
       // Flaky Test = test  that sometimes passes and sometimes fails
       // to solve the flaky test problem we use a feature of jasmmine called "Mocks"
       //Mock lets us replace a method with a fake version
       // therefore we can use mock to create a fake version of getItem()
   });
});
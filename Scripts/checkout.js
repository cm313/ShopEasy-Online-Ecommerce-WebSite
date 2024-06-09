//  checkout.js code is seperated into 2 files
// orderSummary.js and paymentSummary.js

import {renderOrderSummary} from './checkout/orderSummary.js';
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCartFetch} from '../data/cart.js';
// import '../data/cart-class.js';
//import '../data/backend-practise.js';


// using callback function to load only products
/*
loadProducts(() => {
renderOrderSummary();
renderPaymentSummary();
}); 
*/

//  using callbacks to load products and cart
/*
loadProducts(() => {
  loadCart(() =>{
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

//using Promises to load only products

/*
new Promise((resolve)=>{
     loadProducts(()=>{
      resolve();
     })
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/

//using promises to load products and cart
// here first we are loading products,
// after loading the products we are loading cart


/*new Promise((resolve)=>{
  loadProducts(()=>{
    resolve();
  });
}).then(()=>{
   return new Promise((resolve)=>{
     loadCart(()=>{
      resolve();
     });
    });
}).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
});
*/
 

// to load products and cart simultaniously we use Promise.all() API

/*Promise.all([
  loadProductsFetch(),
new Promise((resolve)=>{
  loadCart(()=>{
   resolve();
  });
 })
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
}) */



// using async/await to load products and cart simultaniously
// we can write asynchronous code like normal code using async/await
async function loadPage(){
try{
  await loadProductsFetch();

  const value = await new Promise((resolve)=>{
     loadCartFetch(()=>{
       resolve();
     });
   });
}
catch(error){
  console.log('Unexpected error. Please try again later.');
}
  renderOrderSummary();
  renderPaymentSummary();
  
}


loadPage();

// using promise.all() API to load products and cart
/* Promise.all([
  loadProductsFetch(),
  loadCartFetch()
]).then(()=>{
  renderOrderSummary();
  renderPaymentSummary();
}) */
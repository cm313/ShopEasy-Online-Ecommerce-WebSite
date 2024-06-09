import{cart} from '../data/cart.js';
let cartQuantity = 0;
  cart.forEach((cartItem)=>{
         cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-items').innerHTML = `${cartQuantity}`;
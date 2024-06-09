function Cart(localStorageKey){
// Note: It is easy to create multiple objects 
const cart = {
 cartItems: undefined,
 // a function inside an object is called method
 loadFromStorage(){
  this.cartItems = JSON.parse(localStorage.getItem('localStorageKey'));
  // "this" keyword gives the object that contains this function
   // initially localstorage will empty and return null therefore
   
   if(!this.cartItems){
     this.cartItems = [ 
   
       {
         productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
         quantity: 2,
         deliveryOptionId: '1'
       },
       {
         productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
         quantity: 1,
         deliveryOptionId: '2'
       }
     ];
   }
 },

 saveToStorage(){
  localStorage.setItem('localStorageKey', JSON.stringify(this.cartItems));
},

addToCart(productId, noOfItems){
  let matchingItem = '';
  this.cartItems.forEach((cartItem) =>{
    if(cartItem.productId === productId){
        matchingItem = cartItem;  
    }
  });
  if(matchingItem && noOfItems>1){
  matchingItem.quantity+= Number(noOfItems);
  }
  else if(matchingItem && noOfItems==1){
    matchingItem.quantity+= 1;
  }
   else{
    this.cartItems.push(
      {
         productId: productId,
         quantity: Number(noOfItems),
         deliveryOptionId: '1'
      });
   }

  this.saveToStorage();
},

removeFromCart(productId){
  const newCart=[];
  this.cartItems.forEach((cartItem)=>{
    if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
  });

  this.cartItems = newCart;
 
 this.saveToStorage();
},

updateDeliveryOption(productId, deliveryOptionId){
  // Loop throught the cart and find the product
  // update the deliveryOptionId of that product
  let matchingItem = '';
    this.cartItems.forEach((cartItem) =>{
      if(cartItem.productId === productId){
          matchingItem = cartItem;  
      }
    });
  
    matchingItem.deliveryOptionId = deliveryOptionId;
  
    this.saveToStorage();
  } 
};
  return cart;
}

const cart = Cart('cart-oop');
const bussinessCart = Cart('cart-business');


cart.loadFromStorage();
bussinessCart.loadFromStorage();

console.log(cart);
console.log(bussinessCart);









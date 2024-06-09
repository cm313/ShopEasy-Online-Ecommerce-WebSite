export let cart;

loadFromStorage();

export function loadFromStorage(){
 cart = JSON.parse(localStorage.getItem('cart'));

  // initially localstorage will empty and return null therefore
  
  if(!cart){
    cart = [ 
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
}

function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, noOfItems){
  let matchingItem = '';
  cart.forEach((cartItem) =>{
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
    cart.push(
      {
         productId: productId,
         quantity: Number(noOfItems),
         deliveryOptionId: '1'
      });
   }

  saveToStorage();
}

export function removeFromCart(productId){
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId != productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;
 
 saveToStorage();
};

export function updateDeliveryOption(productId, deliveryOptionId){
// Loop throught the cart and find the product
// update the deliveryOptionId of that product
let matchingItem = '';
  cart.forEach((cartItem) =>{
    if(cartItem.productId === productId){
        matchingItem = cartItem;  
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

// Loading cart from backend using AJAX
/*export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=>{
    console.log("hello");
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
 } */


 //Loading cart from backend using async/await
 export async function loadCartFetch(fun){
  const cartResponse = await fetch('https://supersimplebackend.dev/cart');
  const text = await cartResponse.text();
  console.log(text);
  fun();
  return text;
 } ;
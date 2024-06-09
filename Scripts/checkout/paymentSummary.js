import {cart} from '../../data/cart.js';
import {getProduct} from '../../data/products.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import {formatCurrency} from '../utils/money.js';
import {addOrder} from '../../data/orders.js';
 /* save the data
  generate html
  make it interactive 
  */

  // calculating cost of items in the cart
export function renderPaymentSummary(){
 /* To calculate the cost of the cart Items
 1) Loop through the cart
 2) for each product multiply(productPrice & quantity)
 3) Add everything together
 */
  let productPriceCents  = 0;
  let shippingPriceCents = 0;
  /* calculating the cost of shipping
      steps:
      Loop through the cart
      Add all the shipping costs together */
  cart.forEach((cartItem) =>{
    const product = getProduct(cartItem.productId);
    productPriceCents += product.priceCents * cartItem.quantity;
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPriceCents += deliveryOption.priceCents;
  });
  
  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents  = totalBeforeTaxCents * 0.1;
  let totalCents = totalBeforeTaxCents + taxCents;
  
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
         cartQuantity += cartItem.quantity;
  });
  
  const paymentSummaryHTML = `
  <div class="pay-summary">
    <div class="order-summary">
      <div><b>Order Summary</b></div>
      <div class="itemsprice">
        <div class="items">Items(${cartQuantity}):</div>
        <div class="price">
        $${formatCurrency(productPriceCents)}
        </div>
      </div>
      <div class="itemsprice">
        <div class="items">Shipping & handling:</div>
        <div class="price">
        $${formatCurrency(shippingPriceCents)}
        </div>
      </div>
      <div class="itemsprice">
        <div class="items">Total before tax:</div>
        <div class="price">
        $${formatCurrency(totalBeforeTaxCents)}
        </div>
      </div>
      <div class="itemsprice">
        <div class="items">Estimated tax(10%):</div>
        <div class="price">
        $${formatCurrency(taxCents)}
        </div>
      </div>
    </div>
    <div class="order-total">
      <div class="totalprice">
        <div><b>Order total:</b></div>
        <div>
        <b>$${formatCurrency(totalCents)}</b>
        </div>
      </div>
      <button class ="order-button js-order-button">
      Place your Order
      </button>
    </div>
  </div>
  `;

  document.querySelector('.js-paysummary-container')
  .innerHTML = paymentSummaryHTML;

  document.querySelector('.js-order-button')
  .addEventListener('click', async () =>{
    try{
    // makeing a request to backend to create an order
     const response = await fetch('https://supersimplebackend.dev/orders',{
      // POST method let us send data to the backend
            method: 'POST',
            /*headers gives the backend 
            more information about our request*/
            headers: {
              //this tells the backend what type of data we are sending
                 'Content-Type': 'application/json' 
            },
             // In body we send the actual data
               /* we cannot send object directly to bakend, convert into JSON*/
            body: JSON.stringify({
               cart: cart
            })
          });
    const order = await response.json();
    // it returns a object of product details
    addOrder(order);
        } catch(error){
          console.log('Unexpected error. Try again later.');
        }
           // It is used to go to a specific web page
        window.location.href = 'Orders.html';
  });
}




import{cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
import{getProduct} from '../../data/products.js';
import{formatCurrency} from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {deliveryOptions, getDeliveryOption} from '../../data/deliveryOptions.js';
import {renderPaymentSummary} from './paymentSummary.js';

export function renderOrderSummary(){

    let cartSummaryHtml = '';
    cart.forEach((cartItem) => {
      const productId = cartItem.productId;
      
      const matchingProduct = getProduct(productId);
        const deliveryOptionId = cartItem.deliveryOptionId;
        
        let deliveryOption = getDeliveryOption(deliveryOptionId);
       

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'Days');
        const dateString  = deliveryDate.format('dddd, MMMM D');

      cartSummaryHtml+=
      `
        <div class= "checkout-container  
        js-checkout-container-${matchingProduct.id}">
        <div class="delivery-date">
        Delivery date: ${dateString}
        </div>
        <div class="product-details">
        <img class="product-image" src=${matchingProduct.image}>
        <div class="product-description">
          <div class="product-title">
            ${matchingProduct.name}
          </div>
          <div class="product-price">
            ${matchingProduct.getPrice()}
          </div>
          <div class="product-quantity">
            <span>Quantity: <span>${cartItem.quantity}</span> 
            </span>
            <span class="delete-quantity-link js-delete-link" data-product-id = "${matchingProduct.id}">
              Delete
            </span>
          </div>
        </div>
        <div class="delivery-dates-info">
          <div class="delivery-title">Choose a delivery option:</div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
        </div>
        </div>
      `
    });

    function deliveryOptionsHTML(matchingProduct, cartItem){
      let html = '';
      deliveryOptions.forEach((deliveryOption) => {
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'Days');
        const dateString  = deliveryDate.format('dddd, MMMM D');

        const priceString = deliveryOption.priceCents === 0 
        ? 'FREE'
        : `$${formatCurrency(deliveryOption.priceCents)}`;
        
        const isChecked  = deliveryOption.id === cartItem.deliveryOptionId; 

      html+= `
        <div class="delivery-date-container js-delivery-date-container"
        data-product-id = "${matchingProduct.id}"
        data-delivery-option-id = "${deliveryOption.id}">
          <input class="delivery-option-input" type="radio"
          ${isChecked ? 'checked' :''} 
          name = "delivery-option-${matchingProduct.id}">
          <div class="delivery-day">
            <div class="day"> 
              ${dateString}
            </div>
            <div class="shipping-fee">
            ${priceString}-Shipping
            </div>
          </div>
        </div>
        `
      });

      return html;
    }

    document.querySelector('.js-checkout-summary').innerHTML = cartSummaryHtml;
    document.querySelectorAll('.js-delete-link')
    .forEach((link)=>{
      link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        removeFromCart(productId);
        updateCartQuantity();

      const container = document
      .querySelector(`.js-checkout-container-${productId}`)
      container.remove();

      renderPaymentSummary();
      });
    });

    document.querySelectorAll('.js-update-link')
    .forEach((link)=>{
      link.addEventListener('click', ()=>{
        const productId = link.dataset.productId;
        
      });
    })

    let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`; 

    function updateCartQuantity(){
      let cartQuantity = 0;
    cart.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
    }

    document.querySelectorAll('.js-delivery-date-container')
    .forEach((element)=>{
      element.addEventListener('click', ()=>{
        const  {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
        renderPaymentSummary();
      })
    });
}

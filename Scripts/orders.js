
import {orders} from '../data/orders.js';
import{addToCart} from '../data/cart.js';
import {getProduct, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

async function loadOrderPage(){

  await loadProductsFetch();
  
  let ordersHtml = '';
  orders.forEach((order) => {
   const orderTimeString = dayjs(order.orderTime).format('MMMM D');
    ordersHtml+=
    `
<div class="order-container">
        <div class="order-header">
          <div class="order-header-leftsection">
            <div class="order-date">
              <div class="order-header-lable">Order Placed:</div>
              <div>${orderTimeString}</div>
            </div>
            <div class="order-total">
              <div class="order-header-lable">Total:</div>
              <div>${formatCurrency(order.totalCostCents)}</div>
            </div>
            </div>
            <div class="order-header-rightsection">
              <div class="order-header-lable">Order ID:</div>
              <div>${order.id}</div>
            </div>
        </div>
          <div class="order-items-flex">
             ${productsListHTML(order)}
          </div>
      </div>
    `;
  });
  document.querySelector('.js-order-grid').innerHTML = ordersHtml;

  function productsListHTML(order){
    let productsListHTML = '';

    order.products.forEach((productDetails)=>{
      const productId = productDetails.productId
      const product = getProduct(productId);

     productsListHTML += `
     <div class = "item-details">
     <div class="item-image">
      <img src="${product.image}">
    </div>
    <div class="item-description">
      <div class="item-title">${product.name}</div>
      <div>Arriving on:  ${
        dayjs(productDetails.estimatedDeliveryTime).format('MMMM D')
      }</div>
      <div>Quantity: ${productDetails.quantity}</div>
      <div><button class="js-buy-it-again">Buy it again</button></div>
    </div>
    <div class="track-package">
      <a href="Tracking.html?productId=${product.id}&orderId=${order.id}"> <button>Track package</button> </a>
    </div>
    </div>
     `
    });

    return productsListHTML;
  }
}
loadOrderPage();
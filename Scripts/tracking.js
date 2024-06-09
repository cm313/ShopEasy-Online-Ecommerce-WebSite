import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {getDeliveryOption} from '../../data/deliveryOptions.js';
import{getProduct,loadProductsFetch} from '../../data/products.js';
import{cart} from '../../data/cart.js';

async function renderTrackPage(){
  await loadProductsFetch();
  const url = new URL(window.location.href);
  const productId = url.searchParams.get('productId');

  let renderTrackingItem;
  cart.forEach((cartItem) => {
    const matchingProduct = getProduct(productId);
      const deliveryOptionId = cartItem.deliveryOptionId;
      
      let deliveryOption = getDeliveryOption(deliveryOptionId);

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'Days');
  const dateString  = deliveryDate.format('dddd, MMMM D');

 renderTrackingItem = 
 `<a class="returns-to-order-link" href="orders.html">view all orders</a>
      <div class="delivery-date">Arriving on ${dateString} </div>
      <div class="product-info">${matchingProduct.name}s</div> 
      <div class="product-info">Quantity: 1</div>
      <img class="product-image" src="${matchingProduct.image}">
      <div class="progress-label-container">
        <div>Preparing</div>
        <div>Shipped</div>
        <div>Delivered</div>
      </div>
     <div class="progress-bar-container">
        <div class="progress-bar"></div>
      </div>
  `
});

document.querySelector('.product-tracking').innerHTML = renderTrackingItem;
 }
 
 renderTrackPage();
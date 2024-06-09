import{cart, addToCart} from '../data/cart.js';
import{products,loadProductsFetch} from '../data/products.js';
//import{formatCurrency} from './utils/money.js';

loadProductsFetch(renderProductsGrid);

function renderProductsGrid(){
let productsHTML = '';
products.forEach((product) => {
  productsHTML += `
<div class = "product-container">
<div class="product-pic">
  <img src="${product.image}">
</div>
<div class="product-description">
    ${product.name}
</div>
<div class="ratings-info">
  <div class="stars">
  <img src="${product.getStarsUrl()}">
    </div>
  <div class="members">${product.rating.count}</div>
</div>
<div class="price">${product.getPrice()}</div>
<div class="count">
  <select name = "items" id ="items" class = "js-quantity-selector-${product.id}">
    <option value=1>1</option>
    <option value=2>2</option>
    <option value=3>3</option>
    <option value=4>4</option>
    <option value=5>5</option>
    <option value=6>6</option>
    <option value=7>7</option>
    <option value=8>8</option>
    <option value=9>9</option>
    <option value=10>10</option>
  </select>
</div>

<div class="js-added-to-cart-message added-to-cart-message js-product-add-confirmation-${product.id}" data-testid="added-to-cart-message">
  <img src="images/icons/checkmark.png">
  Added
</div>      
<div class="addtocart-button js-addtocart-button" data-product-id = "${product.id}">
    <button>Add to Cart</button>
</div>
</div>
`;
});

document.querySelector('.js-shopping-grid').innerHTML = productsHTML;

let cartQuantity = 0;
  cart.forEach((cartItem)=>{
         cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-items').innerHTML = `${cartQuantity}`;

function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((cartItem)=>{
         cartQuantity += cartItem.quantity;
  });
  document.querySelector('.js-cart-items').innerHTML = `${cartQuantity}`;
}

document.querySelectorAll('.js-addtocart-button')
.forEach((button) => {
    button.addEventListener('click', ()=>{
     let productId = button.dataset.productId;
      document.querySelector(`.js-product-add-confirmation-${productId}`).classList.add('added-message');
      setTimeout(()=>{
        document.querySelector(`.js-product-add-confirmation-${productId}`).classList.remove('added-message');
      },2000)

      let selector = document.querySelector(`.js-quantity-selector-${productId}`);
      let noOfItems = selector.value;

      addToCart(productId, noOfItems);
       updateCartQuantity();
    });
});
};

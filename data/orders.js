export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  // unshift()  method is used to add an element start of the array
  orders.unshift(order);
  saveToStorage();

}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}
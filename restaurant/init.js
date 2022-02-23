"use strict";
const cartIcon = document.querySelector(".cart-number a");

const order = localStorage.getItem("orderDetails")
  ? JSON.parse(localStorage.getItem("orderDetails"))
  : {};

console.log("from init.js");
console.log(order);
console.log(localStorage.getItem("orderDetails"));
console.log(Object.values(order));

function calDishesOrdered() {
  let dishesOrdered = 0;
  Object.values(order).forEach((v) => (dishesOrdered += v));
  return dishesOrdered;
}

cartIcon.textContent = calDishesOrdered();

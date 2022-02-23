"use strict";
const cartIcon = document.querySelector(".cart-number a");

const order = localStorage.getItem("orderDetails")
  ? JSON.parse(localStorage.getItem("orderDetails"))
  : {};

function calDishesOrdered(order) {
  let dishesOrdered = 0;
  Object.values(order).forEach((v) => (dishesOrdered += v));
  return dishesOrdered;
}

cartIcon.textContent = calDishesOrdered(order);

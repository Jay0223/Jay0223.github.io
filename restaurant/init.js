"use strict";
const cartIcon = document.querySelector(".cart-number a");

export const order = localStorage.getItem("orderDetails")
  ? JSON.parse(localStorage.getItem("orderDetails"))
  : {};

function calDishesOrdered() {
  let dishesOrdered = 0;
  Object.values(order).forEach((v) => (dishesOrdered += v));
  return dishesOrdered;
}

export function updateNumberInCart() {
  const dishesOrdered = calDishesOrdered();
  cartIcon.textContent = dishesOrdered;
  cartIcon.classList.add("edited");
  setTimeout(() => {
    cartIcon.classList.remove("edited");
  }, 1000);
}

cartIcon.textContent = calDishesOrdered();

"use strict";

const cartIcon = document.querySelector(".cart-number a");
const order = localStorage.getItem("orderDetails")
  ? JSON.parse(localStorage.getItem("orderDetails"))
  : {};

console.log("from menu.js");
console.log(order);
console.log(localStorage.getItem("orderDetails"));
console.log(Object.values(order));

cartIcon.textContent = calDishesOrdered();

const orderItems = document.querySelectorAll(".order-item");
orderItems.forEach((ele) => {
  ele.addEventListener("click", orderEventHandler);
  if (order[ele.dataset.dish]) {
    ele.querySelector(".order-amount").value = order[ele.dataset.dish];
  } else {
    ele.querySelector(".order-amount").value = 0;
  }
});

function orderEventHandler(e) {
  const amountInputEle = e.target
    .closest(".order-item")
    .querySelector(".order-amount");
  if (e.target.classList.contains("order-plus")) {
    amountInputEle.value = Number(amountInputEle.value) + 1;
    return;
  }
  if (
    e.target.classList.contains("order-minus") &&
    Number(amountInputEle.value) > 0
  ) {
    amountInputEle.value = Number(amountInputEle.value) - 1;
    return;
  }
  if (e.target.classList.contains("add-to-order")) {
    addToCart(amountInputEle);
    return;
  }
}

function addToCart(ele) {
  const inputNum = Number(ele.value);
  const dishName = ele.closest(".order-item").dataset.dish;
  if (inputNum > 0) {
    showSuccessMsg(ele);
    console.log(order);
    order[dishName] = inputNum;
    console.log(order);
    localStorage.setItem("orderDetails", JSON.stringify(order));
    updateNumberInCart();
  } else {
    showClearMsg(ele);
    console.log(order);
    delete order[dishName];
    console.log(order);
    localStorage.setItem("orderDetails", JSON.stringify(order));
    updateNumberInCart();
  }
}

function updateNumberInCart() {
  const dishesOrdered = calDishesOrdered();
  cartIcon.textContent = dishesOrdered;
  cartIcon.classList.add("edited");
  setTimeout(() => {
    cartIcon.classList.remove("edited");
  }, 1000);
}

function calDishesOrdered() {
  let dishesOrdered = 0;
  Object.values(order).forEach((v) => (dishesOrdered += v));
  return dishesOrdered;
}

function showClearMsg(ele) {
  const p = ele.closest(".order-item").querySelector(".order-clear");
  p.style.setProperty("display", "block");
  setTimeout(() => p.style.setProperty("display", "none"), 1500);
}

function showSuccessMsg(ele) {
  const p = ele.closest(".order-item").querySelector(".order-added");
  p.style.setProperty("display", "block");
  setTimeout(() => p.style.setProperty("display", "none"), 1500);
}

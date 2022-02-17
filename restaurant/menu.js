"use strict";

import { order, updateNumberInCart } from "./init.js";

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
    order[dishName] = inputNum;
    localStorage.setItem("orderDetails", JSON.stringify(order));
    updateNumberInCart();
  } else {
    showClearMsg(ele);
    delete order[dishName];
    localStorage.setItem("orderDetails", JSON.stringify(order));
    updateNumberInCart();
  }
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

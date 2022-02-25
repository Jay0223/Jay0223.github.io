"use strict";

import { order, updateNumberInCart } from "./init.js";

const dishPrice = {
  Lamb: 35,
  Eggplant: 15,
  Crab: 20,
  Noodle: 10,
};

const orderDetailsEle = document.querySelector(".order-details");

orderDetailsEle.addEventListener("click", (e) => {
  if (e.target.classList.contains("clear-cart-btn")) {
    clearCart();
    displayOrder();
    return;
  }
  if (e.target.classList.contains("check-out-btn")) {
    clearCart();
    displayOrder();
    location.href = "index.html";
  }
});

function clearCart() {
  for (const k of Object.keys(order)) delete order[k];
  localStorage.setItem("orderDetails", JSON.stringify(order));
  updateNumberInCart();
}

function displayOrder() {
  orderDetailsEle.innerHTML = "";
  if (Object.keys(order).length === 0) {
    orderDetailsEle.insertAdjacentHTML(
      "afterbegin",
      `<p>Your cart is empty</p>`
    );
  } else {
    let total = 0;
    for (const [k, v] of Object.entries(order)) {
      orderDetailsEle.insertAdjacentHTML(
        "beforeend",
        `<div class="order-item">
      <img src="../img/${k.toLowerCase()}.jpg" title="${k}" />
      <p class="dish-name">${k}</p>
      <p class="dish-price">$${dishPrice[k]} * ${v} = $${dishPrice[k] * v}</p>
    </div>`
      );
      total += dishPrice[k] * v;
    }
    orderDetailsEle.insertAdjacentHTML(
      "beforeend",
      `<p class="order-total">Total: $${total}</p>
      <div class="seperator"></div>
      <div class="order-btns">
        <div class="clear-cart-btn">Clear Cart</div>
        <div class="check-out-btn">Check Out</div>
      </div>
    </div>`
    );
  }
}

displayOrder();

// instruction scroll
const leftArrow = document.getElementById("left-arrow");
const rightArrow = document.getElementById("right-arrow");
const infoArray = [...document.querySelectorAll(".info")];
const arrowWrap = document.getElementById("scroll-arrows");
let curInfo = 0;

arrowWrap.addEventListener("click", (e) => {
  if (e.target === rightArrow) {
    infoArray[++curInfo].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    hideArrow(curInfo);
  }
  if (e.target === leftArrow) {
    infoArray[--curInfo].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    hideArrow(curInfo);
  }
});

function hideArrow(currentInfo) {
  if (currentInfo === 0) {
    leftArrow.hidden = true;
  } else if (currentInfo === infoArray.length - 1) {
    rightArrow.hidden = true;
  } else {
    leftArrow.hidden = false;
    rightArrow.hidden = false;
  }
}

hideArrow(curInfo);

// ----------------------

const input1 = document.getElementById("digit-1");
const input2 = document.getElementById("digit-2");
const input3 = document.getElementById("digit-3");
const input4 = document.getElementById("digit-4");
const inputElementsArray = [...document.querySelectorAll(".digit")];
const inputElementWrapper = document.getElementById("input");
const result = document.getElementById("result");

const tryButton = document.getElementById("try");
const hintButton = document.getElementById("hint");
const resetButton = document.getElementById("reset");

const message1 = document.querySelector(".message1");
const message2 = document.querySelector(".message2");

// + convert type to number
let chancesLeft = +message1.querySelector("span").textContent;

// Enter to click Try, Tab to switch through inputs
inputElementWrapper.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    tryButton.click();
  } else if (e.key === "Tab") {
    e.preventDefault();
    const currentInputIndex = inputElementsArray.indexOf(e.target);
    const nextInputIndex = (currentInputIndex + 1) % 4;
    if (inputElementsArray[nextInputIndex].hasAttribute("disabled")) {
      const nextAbledInput = inputElementsArray[(nextInputIndex + 1) % 4];
      nextAbledInput.focus();
      nextAbledInput.select();
    } else {
      inputElementsArray[nextInputIndex].focus();
      inputElementsArray[nextInputIndex].select();
    }
  }
});

// focus on next input automaticly
// ---- for testing convenience, user experience not perfect
// inputElementWrapper.addEventListener("keyup", (e) => {
//   if (e.key !== "Tab" && e.key !== "Enter") {
//     const currentInputIndex = inputElementsArray.indexOf(e.target);
//     const nextInputIndex = (currentInputIndex + 1) % 4;
//     if (inputElementsArray[nextInputIndex].hasAttribute("disabled")) {
//       const nextAbledInput = inputElementsArray[(nextInputIndex + 1) % 4];
//       nextAbledInput.focus();
//       nextAbledInput.select();
//     } else {
//       inputElementsArray[nextInputIndex].focus();
//       inputElementsArray[nextInputIndex].select();
//     }
//   }
// });

tryButton.addEventListener("click", () => {
  resetElements();
  if (
    input1.value === "" ||
    input2.value === "" ||
    input3.value === "" ||
    input4.value === ""
  ) {
    message2.classList.add("error-message");
    message2.textContent = "Please enter 4-digit number.";
    return;
  }
  const inputString = input1.value + input2.value + input3.value + input4.value;
  const inputArray = inputString.split("");

  // if input is not 4 digit number
  if (!/^[0-9]{4}$/.test(inputString)) {
    message2.classList.add("error-message");
    message2.textContent = "Please enter only numbers.";
    // indicate which input is not number
    [...inputString.matchAll(/[^0-9]/g)].forEach((ele) => {
      inputElementsArray[ele.index].classList.add("error-digit");
    });
    return;
  }
  // if duplicate digits
  const inputSet = new Set(inputArray);
  if (inputArray.length !== inputSet.size) {
    message2.classList.add("error-message");
    message2.textContent = "Please remove duplicate numbers.";
    const duplicateDigitsIndex = new Set();
    inputArray.forEach((ele, ind, arr) => {
      if (ind !== arr.indexOf(ele)) {
        duplicateDigitsIndex.add(ind);
        duplicateDigitsIndex.add(arr.indexOf(ele));
      }
    });
    duplicateDigitsIndex.forEach((value) => {
      inputElementsArray[value].classList.add("error-digit");
    });
    return;
  }
  // if the guess is legit, compare to answer
  let aCount = 0;
  let bCount = 0;
  let guessRating = "";
  inputArray.forEach((ele, ind) => {
    if (answer.indexOf(+ele) === ind) aCount++;
    else if (answer.includes(+ele)) bCount++;
  });
  if (aCount === 4) {
    // Game Won
    gameWon();
    return;
  } else if (aCount === 3) {
    guessRating = "Impressive! You are almost there.";
  } else if (aCount + bCount === 4) {
    guessRating = "Nice work! Only thing left is switching the orders.";
  } else if (aCount + bCount === 3) {
    guessRating = "Keep going! You are on the right track.";
  } else if (aCount + bCount === 2) {
    guessRating = "You can do better than this.";
  } else if (aCount + bCount === 0) {
    guessRating = "This is actually very helpful.";
  } else {
    guessRating = "Bad luck?";
  }
  result.insertAdjacentHTML(
    "afterBegin",
    `<span>${
      11 - chancesLeft
    }. <strong>${aCount}A${bCount}B</strong>. You guessed <strong>${inputString}</strong>.<br/><i>${guessRating}</i></span>`
  );
  // Game Over
  if (chancesLeft === 1) {
    gameLost();
  } else {
    // Game Continue
    message1.querySelector("span").textContent = --chancesLeft;
    inputElementsArray.forEach((ele) => {
      if (!ele.hasAttribute("disabled")) {
        ele.value = "";
      }
    });

    if (input1.hasAttribute("disabled")) {
      input2.focus();
    } else {
      input1.focus();
    }
  }
});

resetButton.addEventListener("click", () => {
  resetElements();
  input1.value = "";
  input1.removeAttribute("disabled");
  input2.value = "";
  input2.removeAttribute("disabled");
  input3.value = "";
  input3.removeAttribute("disabled");
  input4.value = "";
  input4.removeAttribute("disabled");
  tryButton.removeAttribute("disabled");
  hintButton.removeAttribute("disabled");
  chancesLeft = 10;
  message1.innerHTML = "You have <span>10</span> chances left.";
  result.innerHTML = "";
  input1.focus();
  answer = generateFourDigits();
  console.log("The answer is " + answer.join(""));
});

hintButton.addEventListener("click", () => {
  hintButton.setAttribute("disabled", "");
  const randomIndex = Math.floor(Math.random() * 4);
  inputElementsArray[randomIndex].value = answer[randomIndex];
  inputElementsArray[randomIndex].setAttribute("disabled", "");
});

// Generate four different radom digits with Set
function generateFourDigits() {
  const fourDigit = new Set();
  while (fourDigit.size < 4) {
    fourDigit.add(Math.floor(Math.random() * 10));
  }
  return Array.from(fourDigit);
}

// reset elements
function resetElements() {
  input1.classList.remove("error-digit");
  input2.classList.remove("error-digit");
  input3.classList.remove("error-digit");
  input4.classList.remove("error-digit");
  message2.classList.remove("success-message");
  message2.classList.remove("error-message");
}

function gameWon() {
  result.insertAdjacentHTML(
    "afterBegin",
    `<span>${
      11 - chancesLeft
    }. <strong>4A0B</strong>. You guessed <strong>${answer.join(
      ""
    )}</strong>.<br/><i>Bravo! You nailed it~~</i></span>`
  );
  // deselect and disable input once game won
  input1.setSelectionRange(0, 0);
  input1.setAttribute("disabled", "");
  input2.setSelectionRange(0, 0);
  input2.setAttribute("disabled", "");
  input3.setSelectionRange(0, 0);
  input3.setAttribute("disabled", "");
  input4.setSelectionRange(0, 0);
  input4.setAttribute("disabled", "");

  tryButton.setAttribute("disabled", "");
  hintButton.setAttribute("disabled", "");
  message1.innerHTML =
    "&#128293;&#128293; --- Congratulations! --- &#128293;&#128293;";
  message2.classList.add("success-message");
  message2.textContent = "----- YOU WON! -----";
}

function gameLost() {
  input1.value = answer[0];
  input2.value = answer[1];
  input3.value = answer[2];
  input4.value = answer[3];
  input1.setAttribute("disabled", "");
  input2.setAttribute("disabled", "");
  input3.setAttribute("disabled", "");
  input4.setAttribute("disabled", "");
  tryButton.setAttribute("disabled", "");
  hintButton.setAttribute("disabled", "");
  message1.innerHTML = "&#9757;&#9757; --- Correct Answer --- &#9757;&#9757;";
  message2.classList.add("error-message");
  message2.textContent = "----- YOU LOSE -----";
}

// Initiate

input1.focus();

let answer = generateFourDigits();
console.log("The answer is " + answer.join(""));

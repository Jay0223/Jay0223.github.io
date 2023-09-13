//scrolling circles and text at bottom of showcase
const showcase = document.getElementById("showcase");
const outerCircle = document.getElementById("outer-circle");
const middleCircle = document.getElementById("middle-circle");
const innerCircle = document.getElementById("inner-circle");
const scrollingText = document.getElementById("scrolling-text");

function scrollingCirTxtAnimation(r) {
  // don't tranform too much
  if (r < 0.4) {
    r = 0.4;
  }
  if (r > 0.9) {
    r = 0.9;
  }

  // when r = 0.4, rotate 180 deg; when r = 0.9, rotate 0 deg
  outerCircle.style.transform = `translate(-50%, 50%) rotate(${
    45 + 324 - 360 * r
  }deg)`;
  middleCircle.style.transform = `translate(-50%, 50%) rotate(${
    45 - 324 + 360 * r
  }deg)`;
  innerCircle.style.transform = `translate(-50%, 50%) rotate(${
    45 + 324 - 360 * r
  }deg)`;

  // when r = 0.4, opacity = 0; when r = 0.9, opacity = 1
  scrollingText.style.opacity = 2 * r - 0.8;
}

const scrollingObserveOption = {
  root: null,
  threshold: [0.4, 0.5, 0.6, 0.7, 0.8, 0.9],
};

const observeScrolling = new IntersectionObserver((e) => {
  scrollingCirTxtAnimation(e[0].intersectionRatio);
}, scrollingObserveOption);

observeScrolling.observe(showcase);

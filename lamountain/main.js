// fixed nav bar

const navbar = document.getElementById("nav-bar");
const logoName = document.getElementById("logo-name");
const navLinks = document.querySelectorAll(".nav-link");
const hero = document.getElementById("hero");

const options = {
  root: null,
  threshold: [0.3],
};

function navbarAnimation(e) {
  if (!e[0].isIntersecting) {
    navbar.style.setProperty("background-color", "white");
    navLinks.forEach(function (link) {
      link.style.setProperty("color", "var(--theme-color)");
      link.style.setProperty("border-bottom-color", "#366");
    });
    // 10px is .container margin
    logoName.style.setProperty("bottom", "10px");
    logoName.style.setProperty("opacity", "1");
  } else {
    navbar.style.setProperty("background-color", "transparent");
    navLinks.forEach(function (link) {
      link.style.setProperty("color", "white");
      link.style.setProperty("border-bottom-color", "white");
    });
    // 10px is .container margin
    logoName.style.setProperty("bottom", "100%");
    logoName.style.setProperty("opacity", "0");
  }
}

const observeScrolling = new IntersectionObserver((e) => {
  navbarAnimation(e);
}, options);

observeScrolling.observe(hero);

// carousel

const slidesContainer = document.getElementById("slides");
const dotsContainer = document.getElementById("dots");
const slidesCount = slidesContainer.children.length;

// dynamicly create dots based on how many images in HTML
function createDotElements(amount) {
  for (let i = 0; i < amount; i++) {
    dotsContainer.insertAdjacentHTML(
      "beforeend",
      `<div class=dot data-count=${i}></div>`
    );
  }
}

function setCurrent(n) {
  if (dotsContainer.querySelector(".currentDot")) {
    dotsContainer.querySelector(".currentDot").classList.remove("currentDot");
  }
  if (slidesContainer.querySelector(".currentSlide")) {
    slidesContainer
      .querySelector(".currentSlide")
      .classList.remove("currentSlide");
  }
  [...dotsContainer.children][n].classList.add("currentDot");
  [...slidesContainer.children][n].classList.add("currentSlide");
}

dotsContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("dot")) {
    [...slidesContainer.children][+e.target.dataset.count].scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    const index = [...dotsContainer.children].indexOf(e.target);
    setCurrent(index);
  }
});

slidesContainer.addEventListener("click", (e) => {
  if (e.target.classList.contains("slide")) {
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    const index = [...slidesContainer.children].indexOf(e.target);
    setCurrent(index);
  }
});

createDotElements(slidesCount);
setCurrent(0);

// team section background and text change
const scheduleOne = document.getElementById("schedule-1");
const scheduleTwo = document.getElementById("schedule-2");
document.getElementById("mountain-links").addEventListener("click", (e) => {
  if (e.target.classList.contains("mountain-link")) {
    document.querySelector(".curMountain").classList.remove("curMountain");
    e.target.classList.add("curMountain");
    const tab = e.target.dataset.tab;
    if (tab === "tab1") {
      document
        .getElementById("team")
        .style.setProperty("background-image", `url(./img/bg3.png)`);
      scheduleOne.style.setProperty("display", "block");
      scheduleTwo.style.setProperty("display", "none");
    } else if (tab === "tab2") {
      document
        .getElementById("team")
        .style.setProperty("background-image", `url(./img/bg2.png)`);
      scheduleTwo.style.setProperty("display", "block");
      scheduleOne.style.setProperty("display", "none");
    }
  }
});

const link = document.querySelector(".dark-theme-style");
const themeBtnContainer = document.querySelector(".theme-btns");
let theme;

const setTheme = function (t) {
  localStorage.setItem("theme", t);
  theme = t;
  return true;
};
themeBtnContainer.addEventListener("click", (e) => {
  e.target.classList.contains("theme-light") &&
    theme === "dark" &&
    setTheme("light") &&
    link.setAttribute("href", "");
  e.target.classList.contains("theme-dark") &&
    theme === "light" &&
    setTheme("dark") &&
    link.setAttribute("href", "dark-style.css");
});

const init = function () {
  theme = localStorage.getItem("theme");
  if (theme === "dark") {
    link.setAttribute("href", "dark-style.css");
  } else {
    setTheme("light");
  }
};
init();

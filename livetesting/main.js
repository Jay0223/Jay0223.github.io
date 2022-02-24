const addPEle = document.querySelector(".addP");
const clearPEle = document.querySelector(".clearP");
const contentEle = document.querySelector(".content");

addPEle.addEventListener("click", () => {
  const curContent = localStorage.getItem("content") || "";
  localStorage.setItem("content", `${curContent}<p>This is a paragraph.</p>`);
  displayContent();
});

clearPEle.addEventListener("click", () => {
  localStorage.setItem("content", "");
  location.href = "page2.html";
  // displayContent();
});

function displayContent() {
  contentEle.innerHTML = "";
  const content = localStorage.getItem("content") || "There is no paragraph.";
  contentEle.innerHTML = content;
  console.log("from displayContent function");
  console.log(`content: ${content}`);
  console.log(`localStorage: ${localStorage.getItem("content")}`);
}

displayContent();

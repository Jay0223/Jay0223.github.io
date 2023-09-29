const PUBLIC_KEY = "YK3uWlwoypZyGnoCw";
emailjs.init(PUBLIC_KEY);

const contactNameInput = document.getElementById("contact-name");
const contactEmailInput = document.getElementById("contact-email");
const contactMessageInput = document.getElementById("contact-message");
const contactSend = document.getElementById("contact-send");
const contactWarningMsgs = document.querySelectorAll(".input-empty-warning");
const regExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateContactInfo = () => {
  if (!contactNameInput.value.trim()) {
    contactNameInput.nextElementSibling.style.setProperty("opacity", "1");
    return false;
  }
  if (!regExp.test(contactEmailInput.value)) {
    contactEmailInput.nextElementSibling.style.setProperty("opacity", "1");
    return false;
  }
  if (!contactMessageInput.value.trim()) {
    contactMessageInput.nextElementSibling.style.setProperty("opacity", "1");
    return false;
  }
  return true;
};

const clearWarning = () => {
  contactWarningMsgs.forEach((ele) => {
    ele.style.setProperty("opacity", "0");
  });
};

const successfulSubmission = () => {
  contactNameInput.value = "";
  contactEmailInput.value = "";
  contactMessageInput.value = "";
  contactSend.textContent = "Thank You!";
  contactSend.style.setProperty("background-color", "green");
  contactSend.style.setProperty("color", "#fbf7ef");
  setTimeout(() => {
    contactSend.textContent = "Send";
    contactSend.style.setProperty("background-color", "#fbf7ef");
    contactSend.style.setProperty("color", "black");
  }, 2000);
};

document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    clearWarning();
    if (validateContactInfo()) {
      emailjs.sendForm("portfolio_contact", "template_to_me", this).then(() => {
        successfulSubmission();
      });
    }
  });

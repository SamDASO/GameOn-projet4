function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// Close modal event
modalClose.forEach((close) => close.addEventListener("click", closeModal));

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Validation when the user submit the form
function validate() {

  //If the first name is not at least 2 caracters
  let firstInput = document.getElementById('first');

  if (firstInput.value.trim().length < 2) {
    return false;
  }

  //If the last name is not at least 2 caracters
  let lastInput = document.getElementById('last');

  if (lastInput.value.trim().length < 2) {
    return false;
  }

  //If the email is not valid
  let emailInput = document.getElementById('email');
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!validRegex.test(emailInput.value)) {
    return false;
  }

  return true;

}
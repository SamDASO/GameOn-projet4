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

const submitForm = document.querySelectorAll(".btn-submit");
submitForm.forEach((btn) => btn.addEventListener("click", validate));
let formValid = 0;


//If the first name is not at least 2 caracters

function firstValidation() {
  let storedfirst = firstInput.value;
  let firstInput = document.getElementById('first');

  if (firstInput.value.trim().length < 2) {
    // mettre message d'erreur
    firstInput.value = storedfirst;
    formValid++;
  }
}


//If the last name is not at least 2 caracters

function lastValidation() {
  let storedlast = lastInput.value;
  let lastInput = document.getElementById('last');

  if (lastInput.value.trim().length < 2) {
    // mettre message d'erreur
    lastInput.value = storedlast;
    formValid++;
  }
}


//If the email is not valid

function emailValidation() {
  let storedemail = emailInput.value;
  let emailInput = document.getElementById('email');
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!validRegex.test(emailInput.value)) {
    // mettre message d'erreur
    emailInput.value = storedemail;
    formValid++;
  }
}


//If the quantity in the number of competition field is not a number

function competitionValidation() {
  let storedcompetition = competitionInput.value;
  let competitionInput = document.getElementById('quantity');

  if (isNan(competitionInput.value)) {
    // mettre message d'erreur
    competitionInput.value = storedcompetition;
    formValid++;
  }
}

function validate() {
  let functionValidation = firstValidation() + lastValidation() + emailValidation() + competitionValidation();

  if (functionValidation == 0) {
    return true;

  } else {
    return false;
  }
}


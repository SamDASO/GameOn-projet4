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

let firstInput = document.getElementById('first');
let lastInput = document.getElementById('last');
let emailInput = document.getElementById('email');
let dateInput = document.getElementById('birthdate');
let competitionInput = document.getElementById('quantity');
let locationInput = document.querySelectorAll('input[name="location"]');
let termsInput = document.getElementById("checkbox1");

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

function validate(submit) {
  submit.preventDefault();

  // stored inputs
  let storedfirst = firstInput.value;
  let storedlast = lastInput.value;
  let storedemail = emailInput.value;
  let storeddate = dateInput.value;
  let storedcompetition = competitionInput.value;
  let storedlocation = locationInput.value;

  let formValid = 0;

  formValid = firstValidation() + lastValidation() + emailValidation() + dateValidation() + competitionValidation() + locationValidation() + termsValidation();

  if (formValid > 0) {
    lastInput.value = storedlast;
    firstInput.value = storedfirst;
    emailInput.value = storedemail;
    competitionInput.value = storedcompetition;
    dateInput.value = storeddate;
    locationInput.value = storedlocation;
    return false;

  } else {
    return true;
  }
}

// Validation inputs
//If the first name is not at least 2 caracters

function firstValidation() {

  if (firstInput.value.trim().length < 2) {
    firstInput.parentElement.setAttribute('data-error-visible', 'true');
    firstInput.parentElement.setAttribute('data-error', "Le prénom doit contenir au moins 2 caractères");
    return 1;

  } else {
    firstInput.parentElement.setAttribute('data-error-visible', 'false');
    firstInput.parentElement.removeAttribute('data-error');
    return 0;
  }
}

//If the last name is not at least 2 caracters

function lastValidation() {

  if (lastInput.value.trim().length < 2) {
    lastInput.parentElement.setAttribute('data-error-visible', 'true');
    lastInput.parentElement.setAttribute('data-error', "Le nom doit contenir au moins 2 caractères");
    return 1;

  } else {
    lastInput.parentElement.setAttribute('data-error-visible', 'false');
    lastInput.parentElement.removeAttribute('data-error');
    return 0;
  }
}


//If the email is not valid

function emailValidation() {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!validRegex.test(emailInput.value)) {
    emailInput.parentElement.setAttribute('data-error-visible', 'true');
    emailInput.parentElement.setAttribute('data-error', "L'e-mail entré n'est pas valide");
    return 1;

  } else {
    emailInput.parentElement.setAttribute('data-error-visible', 'false');
    emailInput.parentElement.removeAttribute('data-error');
    return 0;
  }
}

//If the birthdate is not registred

function dateValidation() {

  if (!dateInput.value) {
    dateInput.parentElement.setAttribute('data-error-visible', 'true');
    dateInput.parentElement.setAttribute('data-error', "Vous devez entrer votre date de naissance");
    return 1;

  } else {
    dateInput.parentElement.setAttribute('data-error-visible', 'false');
    dateInput.parentElement.removeAttribute('data-error');
    return 0;
  }
}


//If the quantity in the number of competition field is not a number

function competitionValidation() {

  if (isNaN(competitionInput.value) || (!competitionInput.value)) {
    competitionInput.parentElement.setAttribute('data-error-visible', 'true');
    competitionInput.parentElement.setAttribute('data-error', "Ce champ est obligatoire et ne peut contenir que des chiffres");
    return 1;

  } else {
    competitionInput.parentElement.setAttribute('data-error-visible', 'false');
    competitionInput.parentElement.removeAttribute('data-error');

    return 0;
  }
}

//If the location is set

function locationValidation() {

  let isChecked = Array.from(locationInput).some(input => input.checked);
  let group = document.querySelector('.locationData');

  if (!isChecked) {
    group.setAttribute('data-error-visible', 'true');
    group.setAttribute('data-error', "Vous devez choisir un tournoi auquel vous souhaitez participer");
    return 1;

  } else {
    group.setAttribute('data-error-visible', 'false');
    group.removeAttribute('data-error');

    return 0;
  }
}

//If the terms of use are not accept

function termsValidation() {

  if (!termsInput.checked) {
    termsInput.parentElement.setAttribute('data-error-visible', 'true');
    termsInput.parentElement.setAttribute('data-error', "Vous devez avoir lu et accepté les conditions d'utilisation pour pouvoir vous inscrire");
    return 1;

  } else {
    termsInput.parentElement.setAttribute('data-error-visible', 'false');
    termsInput.parentElement.removeAttribute('data-error');

    return 0;
  }
}



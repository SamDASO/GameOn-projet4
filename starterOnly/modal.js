//------------ NAV FUNCTION ------------//
function editNav() {
  const nav = document.getElementById("myTopnav");
  if (nav.className === "topnav") {
    nav.className += " responsive";
  } else {
    nav.className = "topnav";
  }
}

//------------ DOM Elements ------------//

// General

const modalBg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const modalClose = document.querySelectorAll(".close");
const modalValid = document.getElementById("modal-valid");
const form = document.getElementById("form-inscription");

// Form

const firstInput = document.getElementById('first');
const firstInputParent = document.getElementById('first-parent');
const lastInput = document.getElementById('last');
const lastInputParent = document.getElementById('last-parent');
const emailInput = document.getElementById('email');
const emailInputParent = document.getElementById('email-parent');
const dateInput = document.getElementById('birthdate');
const dateInputParent = document.getElementById('birthdate-parent');
const competitionInput = document.getElementById('quantity');
const competitionInputParent = document.getElementById('quantity-parent');
const locationInput = document.querySelectorAll('input[name="location"]');
const locationInputParent = document.getElementById('locationData');
const termsInput = document.getElementById("checkbox1");
const termsInputParent = document.getElementById("checkbox-parent");
const submit = document.querySelectorAll(".btn-submit");

//------------ ADD EVENT LISTENER ------------//

// launch modal event

modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Submitting the form

submit.forEach((btn) => btn.addEventListener("click", submitForm));

// Close modal event

modalClose.forEach((close) => close.addEventListener("click", closeModal));


//------------ MODAL FUNCTIONS ------------//

// launch modal form

function launchModal() {
  modalBg.style.display = "block";
};

// Close modal form

function closeModal() {
  modalBg.style.display = "none";
};

//------------ FORM VALIDATION ------------//

//---- Submit function ----//

function submitForm(event) {
  event.preventDefault();

  let isFormValid = 0;

  isFormValid = validateLengthInput(firstInput, firstInputParent) + validateLengthInput(lastInput, lastInputParent) + validateEmail(emailInput, emailInputParent) + validateDate(dateInput, dateInputParent) + validateNumber(competitionInput, competitionInputParent) + validateRadio(locationInput, locationInputParent) + validateCheckbox(termsInput, termsInputParent);

  if (isFormValid > 0) {

    return false;

  } else {
    form.style.display = "none";
    modalValid.style.display = "block";
    modalClose.forEach((close) => close.addEventListener("click", closeModal));
    return true;
  }
}

//---- Errors display or hide ----//

// Display

function displayError(displayElement, errorMessage) {
  displayElement.setAttribute('data-error-visible', 'true');
  displayElement.setAttribute('data-error', errorMessage);
};

// Hide

function hideError(displayElement) {
  displayElement.setAttribute('data-error-visible', 'false');
  displayElement.removeAttribute('data-error');
};


//---- Validation inputs ----//

// Length

/**
 * checks if the input is longer than 2 caracters - used for a form
 * @param {string} input - The value whose length we want to check
 */
function isMinLength(input) {
  return input.value.trim().length >= 2;
};

//-- Validation function with errors

function validateLengthInput(input, inputParent) {

  if (!isMinLength(input)) {
    displayError(inputParent, "Ce champ doit contenir au moins 2 caractères");
    return 1;

  } else {
    hideError(inputParent);
    return 0;
  }
};


// Email

/**
 * checks if the email input is valid - used for a form
 * @param {string} input - The email provided by the user, which is verified here
 */
function isRegexValid(input) {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return validRegex.test(input.value);
}

//-- Validation function with errors

function validateEmail(email, emailParent) {

  if (!isRegexValid(email)) {
    displayError(emailParent, "L'e-mail entré n'est pas valide");
    return 1;

  } else {
    hideError(emailParent);
    return 0;
  }
}

// Date


/**
 * Function for inputs where the date cannot be superior of the current date of submitting
 * @param {string} inputDate - The element input we want to compare
 */
function isDateValid(inputDate) {
  const setDate = new Date(inputDate.value);
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 100);

  return setDate > minDate && setDate < currentDate
};

//-- Validation function with errors

function validateDate(date, dateParent) {
  if (!date.value || !Date.parse(date.value) || !isDateValid(date)) {
    displayError(dateParent, "Vous devez entrer votre date de naissance correctement");
    return 1;

  } else {
    hideError(dateParent);
    return 0;
  }
}

//Numbers

/**
 * checks if the input is a valid number
 * @param {string} input - The number provided by the user, which is verified here
 */
function isRegexNumberValid(input) {
  //Verify if the pattern matches for a non-negative number and without exponent notation. Also verify if the input is a number.
  const regex = /^[+]?\d+(\.\d+)?$/;
  return regex.test(input.value);
};

//-- Validation function with errors

function validateNumber(numberInput, numberInputParent) {

  if (!numberInput.value || !isRegexNumberValid(numberInput)) {
    displayError(numberInputParent, "Ce champ est obligatoire et ne peut contenir que des chiffres");
    return 1;

  } else {
    hideError(numberInputParent);
    return 0;
  }
};

// Radio


/**
 * Used for required radio buttons. This function checks if one option is selected
 * @param {string} radioInput - The name of the radios buttons
 */
function isRadioValid(radioInput) {
  return Array.from(radioInput).some(input => input.checked);
};

//-- Validation function with errors

function validateRadio(radioInput, radioInputParent) {

  if (!isRadioValid(radioInput)) {
    displayError(radioInputParent, "Vous devez choisir une des options ci-dessus");
    return 1;

  } else {
    hideError(radioInputParent);
    return 0;
  }
}

//Checkbox


/**
 * Verify if the checkbox is checked by the user
 * @param {string} checkbox - The name of the checkbox button
 */
function isCheckboxValid(checkbox) {
  return checkbox.checked
};

//-- Validation function with errors

function validateCheckbox(checkbox, checkboxParent) {

  if (!isCheckboxValid(checkbox)) {
    displayError(checkboxParent, "Vous devez avoir lu et accepté les conditions d'utilisation.");
    return 1;

  } else {
    hideError(checkboxParent);
    return 0;
  }
};



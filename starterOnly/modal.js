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

const modalbg = document.querySelector(".bground");
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
  modalbg.style.display = "block";
};

// Close modal form
function closeModal() {
  modalbg.style.display = "none";
};

//------------ FORM VALIDATION ------------//

// Submit function

function submitForm(event) {
  event.preventDefault();

  let isFormValid = 0;

  isFormValid = lenghtInputValidation(firstInput, firstInputParent) + lenghtInputValidation(lastInput, lastInputParent) + emailValidation(emailInput, emailInputParent) + dateValidation(dateInput, dateInputParent) + numberValidation(competitionInput, competitionInputParent) + checkboxValidation(locationInput, locationInputParent) + btnValidation(termsInput, termsInputParent);

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


/**
 * This function display an error message for each input field of the form.
 * @param {string} displayEl - parent element of the input and where the message needs to be display
 * @param {string} errorMessage - The error message
 */
function errorDisplay(displayEl, errorMessage) {
  displayEl.setAttribute('data-error-visible', 'true');
  displayEl.setAttribute('data-error', errorMessage);
};

/**
 * This function removes the error message applied after the errorDisplay() function.
 * @param {string} displayEl - parent element of the input and where the message needs to be display
 */
function hideError(displayEl) {
  displayEl.setAttribute('data-error-visible', 'false');
  displayEl.removeAttribute('data-error');
};

//---- Validation inputs ----//

/**
 * checks if the input is longer than 2 caracters - used for a form
 * @param {string} name - Replace it with the DOM element which we need to verify the condition
 * @param {string} nameParent - Replace it with the DOM element which is the parent of the previous parameter
 * @returns 1 if the input is empty or smaller than 2 caracters, and 0 if it's longer than 2 caracters
 */
function lenghtInputValidation(name, nameParent) {

  if (name.value.trim().length < 2) {
    errorDisplay(nameParent, "Ce champ doit contenir au moins 2 caractères");
    return 1;

  } else {
    hideError(nameParent);
    return 0;
  }
}


/**
 * checks if the email input is valid - used for a form
 * @param {string} email  - Replace it with the DOM element which we need to verify the condition. This needs to be an email input
 * @param {string} emailParent  - Replace it with the DOM element which is the parent of the previous parameter
 * @returns 1 if the email input is not correct and 0 if it's correct.
 */

function emailValidation(email, emailParent) {
  const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!validRegex.test(email.value)) {
    errorDisplay(emailParent, "L'e-mail entré n'est pas valide");
    return 1;

  } else {
    hideError(emailParent);
    return 0;
  }
}

/**
 * checks if the date input is valid and not empty - used for a form
 * @param {string} date - Replace it with the DOM element which we need to verify the condition.
 * @param {string} dateParent - Replace it with the DOM element which is the parent of the previous parameter
 * @returns 1 if it's not valid and 0 if everything is correct
 */

function dateValidation(date, dateParent) {
  if (!date.value || !Date.parse(date.value) || !isDateValid(date)) {
    errorDisplay(dateParent, "Vous devez entrer votre date de naissance correctement");
    return 1;

  } else {
    hideError(dateParent);
    return 0;
  }
}

//---- Function comparing current date to the input----//

/**
 * Function for inputs where the date cannot be superior of the current date of submitting
 * @param {string} inputDate - The element wich we want to compare the value with the current date
 * @returns false if the input is superior of the current date or true if not
 */
function isDateValid(inputDate) {
  const setDate = new Date(inputDate.value);
  const currentDate = new Date();
  const minDate = new Date(currentDate);
  minDate.setFullYear(minDate.getFullYear() - 100);

  if (setDate < minDate || setDate > currentDate) {
    console.log(minDate);
    return false;
  } else {
    console.log(minDate);
    return true;
  }
};


/**
 * checks if the input is a valid number and is not empty. Valid number means it's not a negative or an exponent number - used for a form
 * @param {string} numberValid - Replace it with the DOM element which we need to verify the condition.
 * @param {string} numberValidParent - Replace it with the DOM element which is the parent of the previous parameter
 * @returns 1 if it's not a valid number and 0 if the number is correct.
 */

function numberValidation(numberValid, numberValidParent) {
  //Verify if the pattern matches for a non-negative number and without exponent notation. Also verify if the input is a number.
  const regex = /^[+]?\d+(\.\d+)?$/;


  if (!numberValid.value || !regex.test(numberValid.value)) {
    errorDisplay(numberValidParent, "Ce champ est obligatoire et ne peut contenir que des chiffres");
    return 1;

  } else {
    hideError(numberValidParent);
    return 0;
  }
}

/**
 * Used for required checkbox. This function checks if one option is selected - Used for a the location checkbox of the form
 * @param {string} checkInput - The DOM ELEMENT reffering to the name of the radios buttons
 * @param {string} checkInputParent - The DOM ELEMENT reffering to the parent of the name of the radios buttons
 * @returns 0 if one option is selected and returns 1 if not.
 */

function checkboxValidation(checkInput, checkInputParent) {

  let isChecked = Array.from(checkInput).some(input => input.checked);

  if (!isChecked) {
    errorDisplay(checkInputParent, "Vous devez choisir une des options ci-dessus");
    return 1;

  } else {
    hideError(checkInputParent);
    return 0;
  }
}

/**
 * Verify in the form modal that the terms of use are checked before submitting the form.
 * @param {string} btn - The DOM ELEMENT reffering to the name of the checkbox button
 * @param {string} btnParent - The DOM ELEMENT reffering to the parent of the name of the checkbox button
 * @returns 0 if it's the case and 1 if not.
 */

function btnValidation(btn, btnParent) {

  if (!btn.checked) {
    errorDisplay(btnParent, "Vous devez avoir lu et accepté les conditions d'utilisation.");
    return 1;

  } else {
    hideError(btnParent);
    return 0;
  }
}



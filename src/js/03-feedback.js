import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');

const STORAGE_KEY = 'feedback-form-state';

feedbackForm.addEventListener('submit', onFormSubmit);
feedbackForm.addEventListener('input', throttle(onValueInput, 500));

let formData = {};

function onFormSubmit(event) {
  event.preventDefault();

  console.log(formData);
  formData = {};
  event.currentTarget.reset();
  localStorage.removeItem(STORAGE_KEY);
}

function onValueInput(event) {
  formData[event.target.name] = event.target.value.trim();

  const formDataString = JSON.stringify(formData);
  localStorage.setItem(STORAGE_KEY, formDataString);
}

function onload() {
  try {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (!savedState) return;
    formData = JSON.parse(savedState);
    Object.entries(formData).forEach(([key, val]) => {
      feedbackForm.elements[key].value = val;
    });
  } catch (error) {
    console.log(error.message);
  }
}

window.addEventListener('load', onload);

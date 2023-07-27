import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

const STORAGE_KEY = 'feedback-form-state';

feedbackForm.addEventListener('submit', onFormSubmit);
emailInput.addEventListener('input', throttle(onValueInput, 500));
messageInput.addEventListener('input', throttle(onValueInput, 500));

onLoadForm();

function onFormSubmit(event) {
  event.preventDefault();

  const emailValue = emailInput.value;
  const messageValue = messageInput.value;
  console.log('email:', emailValue);
  console.log('message:', messageValue);
  event.currentTarget.reset();
  localStorage.removeItem('STORAGE_KEY');
}

function onValueInput(event) {
  const formData = {
    email: emailInput.value,
    message: messageInput.value,
  };

  const formDataString = JSON.stringify(formData);
  localStorage.setItem('STORAGE_KEY', formDataString);
}

function onLoadForm() {
  const savedState = localStorage.getItem('STORAGE_KEY');
  if (savedState) {
    const state = JSON.parse(savedState);
    emailInput.value = state.email;
    messageInput.value = state.message;
  }
}

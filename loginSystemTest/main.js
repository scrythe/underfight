const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const noAccAnker = document.querySelector('.no-acc');

loginBox.addEventListener('submit', (e) => {
  e.preventDefault();
});

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
});

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
});
noAccAnker.addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.classList.toggle('active');
  registerBox.classList.toggle('active');
});

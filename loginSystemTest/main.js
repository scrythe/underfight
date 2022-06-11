const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const noAccAnker = document.querySelector('.no-acc');

loginBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const ah = 'eh';
  testAjax(ah);
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

function testAjax(ah) {
  const requestData = `a=${ah}`;

  const request = new XMLHttpRequest();
  request.open('POST', 'includes/login.inc.php');
  request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  request.onload = () => {
    console.log(request.responseText);
  };
  request.send(requestData);
}

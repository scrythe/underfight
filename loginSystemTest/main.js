const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const noAccAnker = document.querySelector('.no-acc');

loginBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const ah = 'eh';
  testFetch(ah);
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

function testFetch(ah) {
  const data = { a: 'ah' };
  const options = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  };

  fetch('http://localhost/includes/login.inc.php', options)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
}

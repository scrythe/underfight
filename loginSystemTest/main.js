const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const noAccAnker = document.querySelector('.no-acc');
const registerResponse = document.querySelector('.response');

const mapError = {
  'empty-input': 'Please fill out all fields',
  'pwd-not-match': "Passwords don't match",
  'name-or-email-exists': 'Name or Email already exists',
  'user-not-exists': "The User doesn't exists",
  'stmt-error': 'Error occured, please try again',
  success: 'account successfully created',
};

loginBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const ah = 'eh';
  sendPost('login.inc.php', { a: 'ah' }).then((data) => console.log(data));
});

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = registerBox.email.value;
  const username = registerBox.username.value;
  const pwd = registerBox.pwd.value;
  const pwdRepeat = registerBox.pwdRepeat.value;
  const data = { email, username, pwd, pwdRepeat };
  register();
});

noAccAnker.addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.classList.toggle('active');
  registerBox.classList.toggle('active');
});

function sendPost(url, postData) {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    const jsonData = await fetch(
      `http://localhost/includes/${url}`,
      options
    ).catch((error) => reject(error));
    const data = jsonData.json();

    resolve(data);
  });
}

function register() {
  return new Promise(async (resolve) => {
    const email = registerBox.email.value;
    const username = registerBox.username.value;
    const pwd = registerBox.pwd.value;
    const pwdRepeat = registerBox.pwdRepeat.value;

    const data = { email, username, pwd, pwdRepeat };
    const response = await sendPost('register.inc.php', data);
    registerResponse.innerHTML = mapError[response];
    resolve();
  });
}

const loginBox = document.querySelector('.login-box');
const registerBox = document.querySelector('.register-box');
const noAccAnker = document.querySelector('.no-acc');
const registerResponse = document.querySelector('.register-box .response');
const loginResponse = document.querySelector('.login-box .response');

const mapError = {
  'empty-input': 'Please fill out all fields',
  'pwd-not-match': "Passwords don't match",
  'name-or-email-exists': 'Name or Email already exists',
  'user-not-exists': "The User doesn't exists",
  'stmt-error': 'Error occured, please try again',
  'create-success': 'account successfully created',
  'password-wrong': 'The entered Password is wrong',
};

const token = sessionStorage.getItem('token');

if (!token) {
  loginBox.classList.add('active');
}

loginBox.addEventListener('submit', (e) => {
  e.preventDefault();
  login();
});

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
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
    setTimeout(() => {
      loginBox.classList.toggle('active');
      registerBox.classList.toggle('active');
    }, 3000);
    resolve();
  });
}

function login() {
  return new Promise(async (resolve) => {
    const usernameOrEmail = loginBox.usernameOrEmail.value;
    const pwd = loginBox.pwd.value;

    const data = { usernameOrEmail, pwd };
    const response = await sendPost('login.inc.php', data);
    if (!mapError[response]) {
      sessionStorage.setItem('token', response);
      loginBox.classList.remove('active');
    } else {
      loginResponse.innerHTML = mapError[response];
    }
    resolve();
  });
}

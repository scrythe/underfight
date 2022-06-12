const loginBox = document.querySelector('.login-box') as LoginForm;
const registerBox = document.querySelector('.register-box') as RegisterForm;
const noAccAnker = document.querySelector('.no-acc') as HTMLAnchorElement;
const registerResponse = document.querySelector(
  '.register-box .response'
) as HTMLHeadingElement;
const loginResponse = document.querySelector(
  '.login-box .response'
) as HTMLHeadingElement;

interface LoginForm extends HTMLFormElement {
  usernameOrEmail: HTMLInputElement;
  pwd: HTMLInputElement;
}

interface RegisterForm extends HTMLFormElement {
  email: HTMLInputElement;
  username: HTMLInputElement;
  pwd: HTMLInputElement;
  pwdRepeat: HTMLInputElement;
}

const mapError = {
  'empty-input': 'Please fill out all fields',
  'pwd-not-match': "Passwords don't match",
  'name-or-email-exists': 'Name or Email already exists',
  'user-not-exists': "The User doesn't exists",
  'stmt-error': 'Error occured, please try again',
  'create-success': 'account successfully created',
  'password-wrong': 'The entered Password is wrong',
};

function isOfMapError(key: any): key is keyof typeof mapError {
  return key in mapError;
}

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

function sendPost<T>(file: string, postData: Object): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    const url = `http://localhost/php/${file}`;

    const jsonData = await fetch(url, options).catch((error) => reject(error));
    if (!jsonData) return;
    const data: T = await jsonData.json();
    resolve(data);
  });
}

function register(): Promise<void> {
  return new Promise(async (resolve, reject) => {
    const email = registerBox.email.value;
    const username = registerBox.username.value;
    const pwd = registerBox.pwd.value;
    const pwdRepeat = registerBox.pwdRepeat.value;

    const data = { email, username, pwd, pwdRepeat };
    const response = await sendPost<string>('register.php', data);
    if (!isOfMapError(response)) return reject();
    registerResponse.innerHTML = mapError[response];
    setTimeout(() => {
      loginBox.classList.toggle('active');
      registerBox.classList.toggle('active');
    }, 3000);
    resolve();
  });
}

function login(): Promise<void> {
  return new Promise(async (resolve, _reject) => {
    const usernameOrEmail = loginBox.usernameOrEmail.value;
    const pwd = loginBox.pwd.value;

    const data = { usernameOrEmail, pwd };
    const response = await sendPost<string>('login.php', data);
    if (!isOfMapError(response)) {
      sessionStorage.setItem('token', response);
      loginBox.classList.remove('active');
    } else {
      loginResponse.innerHTML = mapError[response];
    }
    resolve();
  });
}

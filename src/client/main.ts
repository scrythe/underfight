import { sendAuthToken, sendLogin, sendRegister } from './api';
import ClientEventEmitter from './clientEventEmitter';

const loginBox = document.querySelector('.login-box') as LoginForm;
const registerBox = document.querySelector('.register-box') as RegisterForm;
const noAccAnker = document.querySelector('.no-acc') as HTMLAnchorElement;
const registerResponse = document.querySelector(
  '.register-box .response'
) as HTMLHeadingElement;
const loginResponse = document.querySelector(
  '.login-box .response'
) as HTMLHeadingElement;
const loginRegisterSection = document.querySelector(
  '.login-register-section'
) as HTMLElement;

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

const userToken = sessionStorage.getItem('token');

if (!userToken) {
  loginRegisterSection.classList.add('active');
  loginBox.classList.add('active');
} else {
  const [selector, token] = userToken.split(':');
  sendAuthToken(selector, token)
    .then()
    .catch((error) => console.error(error));
}

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
  register();
});

noAccAnker.addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.classList.toggle('active');
  registerBox.classList.toggle('active');
});

function register(): Promise<void> {
  return new Promise(async (resolve) => {
    const email = registerBox.email.value;
    const username = registerBox.username.value;
    const pwd = registerBox.pwd.value;
    const pwdRepeat = registerBox.pwdRepeat.value;

    const data = { email, username, pwd, pwdRepeat };
    const response = await sendRegister(data);
    registerResponse.innerHTML = mapError[response];
    if (response != 'create-success') return resolve();
    setTimeout(() => {
      loginBox.classList.toggle('active');
      registerBox.classList.toggle('active');
    }, 3000);
    resolve();
  });
}

function login(clientEventEmitter: ClientEventEmitter): Promise<void> {
  return new Promise(async (resolve) => {
    const usernameOrEmail = loginBox.usernameOrEmail.value;
    const pwd = loginBox.pwd.value;

    const data = { usernameOrEmail, pwd };
    const response = await sendLogin(data);
    if (!isOfMapError(response)) {
      sessionStorage.setItem('token', response);
      loginRegisterSection.classList.remove('active');
      loginBox.classList.remove('active');
      clientEventEmitter.emit('startGame');
    } else {
      loginResponse.innerHTML = mapError[response];
    }
    resolve();
  });
}

export function onLogin(clientEventEmitter: ClientEventEmitter) {
  loginBox.addEventListener('submit', (e) => {
    e.preventDefault();
    login(clientEventEmitter);
  });
}

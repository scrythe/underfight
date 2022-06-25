import {
  resetPwdApi,
  sendAuthToken,
  sendLogin,
  sendPwdForgot,
  sendRegister,
} from './api';
import ClientEventEmitter from './clientEventEmitter';
import { getUser, isUser } from './user';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

let resetPwdPage = false;

const loginBox = document.querySelector('.login-box') as LoginForm;
const registerBox = document.querySelector('.register-box') as RegisterForm;
const forgotPwdBox = document.querySelector('.forgot-pwd-box') as ForgotPwd;
const resetPwdBox = document.querySelector('.reset-pwd-box') as ResetPwd;
const noAccAnker = document.querySelector('.no-acc') as HTMLAnchorElement;
const forgotPwdAnker = document.querySelector(
  '.forgot-pwd'
) as HTMLAnchorElement;
const registerResponse = document.querySelector(
  '.register-box .response'
) as HTMLHeadingElement;
const loginResponse = document.querySelector(
  '.login-box .response'
) as HTMLHeadingElement;
const forgotPwdResponse = document.querySelector(
  '.forgot-pwd-box .response'
) as HTMLHeadingElement;
const resetPwdResponse = document.querySelector(
  '.reset-pwd-box .response'
) as HTMLHeadingElement;
const loginRegisterSection = document.querySelector(
  '.login-register-section'
) as HTMLElement;

if (urlParams.get('reset-pwd')) {
  resetPwdPage = true;
  resetPwdBox.classList.add('active');
}

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

interface ForgotPwd extends HTMLFormElement {
  email: HTMLInputElement;
}

interface ResetPwd extends HTMLFormElement {
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
  'email-not-exists': "Email doesn't exists",
};

function isOfMapError(key: any): key is keyof typeof mapError {
  return key in mapError;
}

const userToken = sessionStorage.getItem('token');

userTokenFunc();
function userTokenFunc() {
  if (!userToken) {
    loginRegisterSection.classList.add('active');
    if (resetPwdPage) return;
    loginBox.classList.add('active');
  } else {
    getUser(userToken)
      .then((data) => {
        if (!isUser(data)) return console.error('failed to auth token');
      })
      .catch((error) => console.error(error));
    const [selector, token] = userToken.split(':');
    sendAuthToken(selector, token)
      .then()
      .catch((error) => console.error(error));
  }
}

registerBox.addEventListener('submit', (e) => {
  e.preventDefault();
  register();
});

forgotPwdBox.addEventListener('submit', (e) => {
  e.preventDefault();
  forgotPwd();
});

resetPwdBox.addEventListener('submit', (e) => {
  e.preventDefault();
  resetPwd();
});

noAccAnker.addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.classList.remove('active');
  registerBox.classList.add('active');
});

forgotPwdAnker.addEventListener('click', (e) => {
  e.preventDefault();
  loginBox.classList.remove('active');
  forgotPwdBox.classList.add('active');
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

function forgotPwd(): Promise<void> {
  return new Promise(async (resolve) => {
    const email = forgotPwdBox.email.value;
    const response = await sendPwdForgot(email);
    if (!isOfMapError(response)) {
      console.log(response);
    } else {
      forgotPwdResponse.innerHTML = mapError[response];
    }
    resolve();
  });
}

function resetPwd(): Promise<void> {
  return new Promise(async (resolve) => {
    const pwd = resetPwdBox.pwd.value;
    const pwdRepeat = resetPwdBox.pwdRepeat.value;
    const selector = urlParams.get('selector');
    const token = urlParams.get('token');
    if (typeof selector !== 'string') return;
    if (typeof token !== 'string') return;
    const response = await resetPwdApi(pwd, pwdRepeat, selector, token);
    if (!isOfMapError(response)) {
      resetPwdResponse.innerHTML =
        'Password successfully changed <br> wait 3 seconds';
      setTimeout(() => {
        const url = new URL(window.location.href);
        window.location.href = url.host;
      }, 3000);
    } else {
      resetPwdResponse.innerHTML = mapError[response];
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

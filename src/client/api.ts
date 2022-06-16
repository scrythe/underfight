import {
  RegisterApiResponses,
  LoginApiResponses,
  AuthTokenApiResponses,
} from './interfaces';

const phpUrl = process.env['PHP_URL'] || 'http://localhost:593';

function sendPost<T>(file: string, postData: Object): Promise<T> {
  return new Promise(async (resolve, reject) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(postData),
    };

    const url = `${phpUrl}/${file}`;

    const jsonData = await fetch(url, options).catch((error) => reject(error));
    if (!jsonData) return;
    const data: T = await jsonData.json();
    resolve(data);
  });
}

interface RegisterData {
  email: string;
  username: string;
  pwd: string;
  pwdRepeat: string;
}

export function sendRegister(data: RegisterData) {
  return sendPost<RegisterApiResponses>('register.php', data);
}

interface LoginData {
  usernameOrEmail: string;
  pwd: string;
}

export function sendLogin(data: LoginData) {
  return sendPost<LoginApiResponses>('login.php', data);
}

export function sendAuthToken(
  selector: string | undefined,
  token: string | undefined
) {
  return sendPost<AuthTokenApiResponses>('authorizeToken.php', {
    selector,
    token,
  });
}

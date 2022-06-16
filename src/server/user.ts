import axios from 'axios';
import { User } from './interfaces';

export function getUser(userToken: string) {
  const [selector, token] = userToken.split(':');
  return sendPost('authorizeToken.php', { selector, token });
}

export function isUser(user: any): user is User {
  return !!user.userID;
}

const phpUrl = process.env['PHP_URL'] || 'http://localhost:593';

function sendPost(file: string, postData: Object): Promise<any> {
  return new Promise(async (resolve, reject) => {
    const url = `${phpUrl}/${file}`;
    const response = await axios
      .post(url, postData)
      .catch((error) => reject(error));

    if (!response) return;
    const { data } = response;
    resolve(data);
  });
}

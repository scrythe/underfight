import axios from 'axios';
import { AuthTokenApiResponses } from './interfaces';

const phpUrl = process.env['PHP_URL'] || 'http://localhost:593';

function sendPost<T>(file: string, postData: Object): Promise<T> {
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

export function sendAuthToken(
  selector: string | undefined,
  token: string | undefined
) {
  return sendPost<AuthTokenApiResponses>('authorizeToken.php', {
    selector,
    token,
  });
}

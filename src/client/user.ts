import { User } from './interfaces';
import { sendAuthToken } from './api';

export function getUser(userToken: string) {
  const [selector, token] = userToken.split(':');
  return sendAuthToken(selector, token);
}

export function isUser(user: any): user is User {
  return !!user.userID;
}

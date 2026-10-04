import { readTestData } from './json-reader';

export interface User {
  username: string;
  password: string;
  description: string;
}

type UsersFile = Record<string, User>;

/** Looks up a SauceDemo user by key (e.g. "standard_user"). */
export function getUser(key: string): User {
  const users = readTestData<UsersFile>('users.json');
  const user = users[key];
  if (!user) {
    throw new Error(`Unknown user "${key}". Available: ${Object.keys(users).join(', ')}`);
  }
  return user;
}

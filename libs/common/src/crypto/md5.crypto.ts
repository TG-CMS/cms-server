import { createHash } from 'crypto';

export function getRandomSalt(start = 2, end = 16) {
  return Math.random().toString().slice(start, end);
}
export async function md5(key: string): Promise<string> {
  return createHash('md5').update(`${key}`).digest('hex').toUpperCase();
}
export async function Token(userId: number) {
  const salt = getRandomSalt(2, 12);
  const token = await md5(`${userId}:${getRandomSalt()}:${Date.now()}`);
  const accessToken = `${token}.${salt}`;
  return {
    accessToken,
    token,
    salt,
  };
}

import { randomBytes, pbkdf2Sync } from 'crypto';

export const makeSalt = (): string => {
  return randomBytes(3).toString('base64');
};

/**
 * use salt to encode password
 * @param password
 * @param salt
 */
export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) return '';
  const tempSalt = Buffer.from(salt, 'base64');
  return pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64');
};

import * as dotenv from 'dotenv';
import { createCipheriv, createDecipheriv, scrypt } from 'crypto';
import { promisify } from 'util';

dotenv.config();

const password = process.env.ENCRIPTION_KEY;
const iv = Buffer.from('00000000000000000000000000000000', 'hex'); // IV as a Buffer (16 bytes in hex)
console.log(password, 'password.............................');

// Encrypt function
export async function encryptString(plainText: string) {
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const cipher = createCipheriv('aes-256-ctr', key, iv);

  const encryptedText = Buffer.concat([
    cipher.update(plainText, 'utf8'),
    cipher.final(),
  ]);

  // Return the encrypted text as a hex string
  return encryptedText.toString('hex');
}

// Decrypt function
export async function decryptString(encryptedText: string) {
  const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
  const decipher = createDecipheriv('aes-256-ctr', key, iv);

  const encryptedBuffer = Buffer.from(encryptedText, 'hex');
  const decryptedText = Buffer.concat([
    decipher.update(encryptedBuffer),
    decipher.final(),
  ]);

  // Return the decrypted text as a UTF-8 string
  return decryptedText.toString('utf-8');
}

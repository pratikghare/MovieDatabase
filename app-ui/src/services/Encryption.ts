import * as CryptoJS from 'crypto-js';
import { SECRET_KEY } from '../environment/environment';

export const encrypt = (plainText: string, secretKey: string = SECRET_KEY): string => CryptoJS.AES.encrypt(plainText, secretKey).toString();

export const decrypt = (cipherText: string, secretKey: string = SECRET_KEY): string => CryptoJS.AES.decrypt(cipherText, secretKey).toString(CryptoJS.enc.Utf8);
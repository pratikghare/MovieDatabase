import Cryptr from 'cryptr';
const cryptr = new Cryptr('tmdb-app');

export const encrypt = (str: string): string => cryptr.encrypt(str);

export const decrypt = (str: string): string => cryptr.decrypt(str);

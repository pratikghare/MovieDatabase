import Cryptr from "cryptr";

const cryptr = new Cryptr("In a world where everyone shows and tells everthing.... I value discretion and privacy!!");

export const decrypt = (encrypted: string) => cryptr.decrypt(encrypted);

export const encrypt = (value: string) => cryptr.encrypt(value);
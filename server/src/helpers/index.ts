const crypto = require('crypto');

function exclude(obj: any, keys: string[]) {
  for (let key of keys) {
    delete obj[key];
  }
  return obj;
}

function filterPasswordKeys(obj: any) {
  return filterKeys(obj, ['hashedPassword', 'salt']);
}

function filterKeys(obj: any, keys: string[]) {
  exclude(obj, keys);
  for (let value of Object.values(obj)) {
    if (value instanceof Object) {
      filterKeys(value, keys);
    }
  }
  return obj;
}

function generateSalt(length: number) {
  return crypto.randomBytes(length);
}

function encrypt(password: string, salt: string) {
  return crypto.pbkdf2Sync(password, salt, 310000, 32, 'sha256');
}

function hashEquals(hashedA: string, hashedB: string) {
  return crypto.timingSafeEqual(hashedA, hashedB);
}

module.exports = {
  exclude,
  filterPasswordKeys,
  filterKeys,
  encrypt,
  hashEquals,
  generateSalt
};

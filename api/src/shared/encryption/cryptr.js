

// Must be 256 bytes (32 characters)
var ENCRYPTION_KEY =
  process.env.NODE_ENV === 'development' ? 'abcdefghijklmnopqrstuvwxyzasdfjk' : process.env.ENCRYPTION_KEY;

if (!ENCRYPTION_KEY) {
  throw new Error(
    'Looks like youre missing an encryption key for sensitive data!'
  );
}

var Cryptr = require('cryptr'),
  cryptr = new Cryptr(ENCRYPTION_KEY);

function encryptString(text /*: string */) /*: string */ {
  return cryptr.encrypt(text);
}

function decryptString(text /*: string */) /*: string */ {
  return cryptr.decrypt(text);
}

function encryptObject(object /*: Object */) /*: Object */ {
  return cryptr.encrypt(JSON.stringify(object));
}

function decryptObject(text /*: string */) /*: Object */ {
  return JSON.parse(cryptr.decrypt(text));
}

export {
    decryptString, encryptString,
    decryptObject, encryptObject
};

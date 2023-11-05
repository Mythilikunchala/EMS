const crypto = require('crypto');

// Generate a random secret key as a hexadecimal string
const secretKeyHex = crypto.randomBytes(32).toString('hex');
console.log('Generated Secret Key (Hex):', secretKeyHex);

// Convert the hexadecimal key to base64
const secretKeyBase64 = Buffer.from(secretKeyHex, 'hex').toString('base64');
console.log('Generated Secret Key (Base64):', secretKeyBase64);

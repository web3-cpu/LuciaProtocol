const crypto = require('crypto');
// Example symmetric key and IV (must be the same used during encryption)
const symmetricKey = crypto.randomBytes(32); // 256-bit key for AES-256
const iv = crypto.randomBytes(16); // IV must be 16 bytes for AES

// Encrypting some data
const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
let encrypted = cipher.update('Hello, World!', 'utf8', 'hex');
encrypted += cipher.final('hex');

// Decrypting the data
console.log("symmetricKey: ",symmetricKey);
const decipher = crypto.createDecipheriv('aes-256-cbc', symmetricKey, iv);
let decrypted = Buffer.concat([decipher.update(encrypted, 'hex'), decipher.final()]); // Correct use of Buffer.concat
console.log('Decrypted:', decrypted.toString('utf8')); // Should output "Hello, World!"
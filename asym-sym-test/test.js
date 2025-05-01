const crypto = require('crypto');
// Test the decryption directly without ECC
const aesKey = crypto.randomBytes(32); // Use the same key
const testIV = crypto.randomBytes(16); // Use the same IV

// Encrypt using the same key and IV
const testCipher = crypto.createCipheriv('aes-256-cbc', aesKey, testIV);
let testEncrypted = testCipher.update("test data", 'utf8', 'hex');
testEncrypted += testCipher.final('hex');

// Decrypt using the same key and IV
const testDecipher = crypto.createDecipheriv('aes-256-cbc', aesKey, testIV);
let decryptedData = testDecipher.update(testEncrypted, 'hex', 'utf8');
decryptedData += testDecipher.final('utf8');

console.log("Decrypted Data:", decryptedData); // Should output "test data"

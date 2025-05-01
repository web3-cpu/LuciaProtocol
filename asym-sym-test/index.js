const crypto = require('crypto');
const elliptic = require('elliptic');

// Step 1: Generate ECC Key Pair (Customer)
const ec = new elliptic.ec('secp256k1'); // Using the secp256k1 curve
const customerKeyPair = ec.genKeyPair();
const customerPublicKey = customerKeyPair.getPublic(); // Customer's public key
const customerPrivateKey = customerKeyPair.getPrivate('hex'); // Customer's private key

// Step 2: Service Provider generates a Symmetric Key (AES)
const symmetricKey = crypto.randomBytes(32); // 256-bit key for AES
const iv = crypto.randomBytes(16); // Initialization vector

// Step 3: Encrypt Data using AES (Symmetric Encryption)
const data = "Sensitive data from the service provider";
const cipher = crypto.createCipheriv('aes-256-cbc', symmetricKey, iv);
let encryptedData = cipher.update(data, 'utf8', 'hex');
encryptedData += cipher.final('hex');

// Step 4: Encrypt the Symmetric Key using ECC (Asymmetric Encryption)
const providerKeyPair = ec.genKeyPair(); // Simulating the provider's key pair
const providerPublicKey = providerKeyPair.getPublic(); // Provider's public key

// Derive the shared secret using the customer's public key
const sharedSecret = providerKeyPair.derive(customerPublicKey).toArray();
const keyMaterial = crypto.createHash('sha256').update(Buffer.from(sharedSecret)).digest();
console.log("Provider Key Material:", keyMaterial.toString('hex'));

// Encrypt the symmetric key with the derived key material
const encryptedSymmetricKey = crypto.createCipheriv('aes-256-cbc', keyMaterial, iv).update(symmetricKey, null, 'hex');

// Step 5: Send encrypted data and encrypted symmetric key to the customer
console.log("Encrypted Data:", encryptedData);
console.log("Encrypted Symmetric Key:", encryptedSymmetricKey);
console.log("IV:", iv.toString('hex'));

// Customer Side
// Step 6: Derive the shared secret using their private key and the provider's public key
const customerSharedSecret = customerKeyPair.derive(providerPublicKey).toArray();
console.log("Customer Shared Secret:", customerSharedSecret);
const customerKeyMaterial = crypto.createHash('sha256').update(Buffer.from(customerSharedSecret)).digest();

console.log("Customer Key Material to string:", customerKeyMaterial.toString('hex'));
console.log("Customer Key Material:", customerKeyMaterial);

// Step 7: Decrypt the Symmetric Key using the derived key material
const decipherSymmetricKey = crypto.createDecipheriv('aes-256-cbc', customerKeyMaterial, iv);
decipherSymmetricKey.setAutoPadding(false);
let decryptedSymmetricKey;
try {
    decryptedSymmetricKey = Buffer.concat([decipherSymmetricKey.update(encryptedSymmetricKey, 'hex'), decipherSymmetricKey.final()]);
    console.log("Decrypted Symmetric Key:", decryptedSymmetricKey.toString('hex'));
} catch (err) {
    console.error("Failed to decrypt symmetric key:", err);
    return;
}

// Step 8: Decrypt the Data using the decrypted Symmetric Key
const decipherData = crypto.createDecipheriv('aes-256-cbc', decryptedSymmetricKey, iv);
let decryptedData;
try {
    decryptedData = decipherData.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipherData.final('utf8');
} catch (err) {
    console.error("Failed to decrypt data:", err);
    return;
}

console.log("Decrypted Data:", decryptedData);


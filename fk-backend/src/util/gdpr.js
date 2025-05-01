import crypto from "crypto";

const algorithm = "aes-256-cbc";
// const ENCRYPTION_KEY = crypto.randomBytes(32);
// const key = Buffer.from(ENCRYPTION_KEY, "hex");
const key = Buffer.from(process.env.GDPR_ENCRYPTION_KEY, "hex");
const iv = Buffer.from(process.env.GDPR_ENCRYPTION_IV, "hex");

export function encrypt(text) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(text) {
  try {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    let decrypted = decipher.update(text, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  } catch (error) {
    console.error("Decryption failed:", error.message);
    return text;
  }
}

export function encryptClientFields(client) {
  if (client.name) {
    client.name = encrypt(client.name);
  }
  if (client.company_name) {
    client.company_name = encrypt(client.company_name);
  }
  if (client.picture) {
    client.picture = encrypt(client.picture);
  }
  return client;
}

export function decryptClientFields(client) {
  if (client.name) {
    client.name = decrypt(client.name);
  }
  if (client.company_name) {
    client.company_name = decrypt(client.company_name);
  }
  if (client.picture) {
    client.picture = decrypt(client.picture);
  }
  return client;
}

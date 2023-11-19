const crypto = require('node:crypto');
const jwt = require('jsonwebtoken');

// Generate JWT encryption key
const jwtSecret = crypto.randomBytes(32).toString('base64');
console.log(`jwtSecret: ${jwtSecret}`);
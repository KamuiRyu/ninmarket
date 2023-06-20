const bcrypt = require("bcrypt");
const crypto = require("crypto");

const generateRandomKey = () => {
    const length = 16;
    const randomBytes = crypto.randomBytes(length);
    const base64 = randomBytes.toString("base64");
    const key = bcrypt.hashSync(base64, 10);
    return key;
};

const secretKey = generateRandomKey();

console.log("Your secret key is: " + secretKey);

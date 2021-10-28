import Elliptic from "elliptic";
const EC = Elliptic.ec;
const ec = new EC("secp256k1");

// this is a testing key generation... already generated key: stored in testkeys.txt
const key = ec.genKeyPair();
const publicKey = key.getPublic("hex");
const privateKey = key.getPrivate("hex");

console.log("Private Key: ", privateKey);
console.log("Public key: ", publicKey);

// THis file is to make inital deposits to the accounts that sit in the databse... no
/*This file has the first function as a key generator... priv and public keys to help me generate keys whenever i need to. */
/* ROMEO'S KEYS
PRIVATE:  d56f2bd3eb7c5612fbc04c96342102327c7c9ae44abf01ed5316604747d6f111
PUBLIC:   047b1ca607797acfdd5d27173275484cf97ac0bc434a5fee5bd2a1e086cfe5ed42fc43220068120875e64713971f185fa538108b5992f494228f6865112c953453
*/
var keyGenerator = function () {
    var elliptic = require("elliptic");
    // let sha3 = require('js-sha3');
    var ec = new elliptic.ec("secp256k1");
    var keyPair = ec.genKeyPair(); // Generate random keys... both the public and private
    // console.log(keyPair)
    var privKey = keyPair.getPrivate(); // get the private key
    //console.log(privKey) // the raw private key
    console.log(privKey.toString("hex")); // the hexedecimal value of the private key....
    // now extract the public key:
    var pubKey = keyPair.getPublic();
    // console.log(pubKey)
    var newpubKey = pubKey.encode("hex"); // the hex version of the public key
    console.log(newpubKey);
};
//# sourceMappingURL=testTransferer.js.map
const crypto = require('crypto');
const EdDSA = require('elliptic').eddsa
const ec = new EdDSA('ed25519')


class Transaction {
    /**
     * @param {string} fromAddress
     * @param {string} toAddress
     * @param {number} amount
     */
    constructor(fromAddress, toAddress, amount) {
      this.fromAddress = fromAddress;
      this.toAddress = toAddress;
      this.amount = amount;
      this.timestamp = Date.now();
    }
  
    /**
     * Creates a SHA256 hash of the transaction
     *
     * @returns {string}
     */
    calculateHash() {
      return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp).digest('hex');
    }
  
    /**
     * Signs a transaction with the given signingKey (which is an Elliptic keypair
     * object that contains a private key). The signature is then stored inside the
     * transaction object and later stored on the blockchain.
     *
     * @param {string} signingKey
     */
    signTransaction(signingKey) {
      // You can only send a transaction from the wallet that is linked to your
      // key. So here we check if the fromAddress matches your publicKey
      let pubk = Buffer.from(signingKey.getPublic('hex'))
      let key = signingKey.getPublic('hex')
      console.log('PUBLIC KEY BUFFER : ',pubk.toString())
      console.log('PUBLIC KEY : ',key)

      
      if (key !== this.fromAddress) {
        console.log('FROM :',address)
        console.log('From : ', this.fromAddress)

        throw new Error('You cannot sign transactions for other wallets!');
      }
      
  
      // Calculate the hash of this transaction, sign it with the key
      // and store it inside the transaction obect
      const hashTx = this.calculateHash();
      const sig = signingKey.sign(hashTx).toHex();
  
      this.signature = sig
      console.log('SIGNATURE : ',sig)
    }
  
    /**
     * Checks if the signature is valid (transaction has not been tampered with).
     * It uses the fromAddress as the public key.
     *
     * @returns {boolean}
     */
    isValid() {
      // If the transaction doesn't have a from address we assume it's a
      // mining reward and that it's valid. You could verify this in a
      // different way (special field for instance)
      if (this.fromAddress === null) return true;
  
      if (!this.signature || this.signature.length === 0) {
        throw new Error('No signature in this transaction');
      }
       console.log('THIS FROM ADDRESS : ',this.fromAddress)

      const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');

      return publicKey.verify(this.calculateHash(), this.signature);
    }
  }
  
  module.exports.Transaction = Transaction;
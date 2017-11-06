const crypto = require('crypto');

class Block {
  constructor(index, previousBlockHash, timestamp, data, difficulty, nonce = 0) {
    this.index = index;
    this.previousBlockHash = previousBlockHash;
    this.timestamp = timestamp;
    this.data = data;
    this.difficulty = difficulty;
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  getHeader() {
    return (
      `${this.index}-${this.previousBlockHash}-` +
      `${this.timestamp}-${this.data}-` +
      `${this.difficulty}-${this.nonce}`
    );
  }

  calculateHash() {
    const hash = crypto.createHash('sha256');
    hash.update(this.getHeader());
    return hash.digest('hex');
  }

  isValid(previousBlock) {
    if (this.index !== previousBlock.index + 1) {
      return false;
    }

    if (this.previousBlockHash !== previousBlock.calculateHash()) {
      return false;
    }

    if (this.hash !== this.calculateHash()) {
      return false;
    }

    if (!this.hash.startsWith('0'.repeat(this.difficulty))) {
      return false;
    }

    return true;
  }
}

module.exports = Block;
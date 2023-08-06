//StarlingCoin by Misash

const sha256 = require('crypto-js/sha256')

class Block{

    constructor(index,timestamp,data,previousHash=''){

        this.index = index
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        this.hash = this.calculateHash();
    }

    calculateHash(){
        let x = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data);
        return sha256(x).toString();
    }

}


class Blockchain{

    constructor(){
        this.chain = [this.createGenesisBlock()];
        // console.log("chain: ", this.chain);
    }

    createGenesisBlock(){
        return new Block(0,"1691349895",{message: "cypherpunks write code"});
    }

    getlatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = this.getlatestBlock().hash;
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = chain[i];
            const prevBlock = chain[i-1];

            //check hash
            if( currentBlock.hash != currentBlock.calculateHash()){
                return false;
            }
            //check prevhash
            if( currentBlock.previousHash != prevBlock.hash){
                return false;
            }
        }

        return true;
    }

}


//create blockchain
let StarlingCoin = new Blockchain()


//adding blocks to the blockchain
StarlingCoin.addBlock(new Block (1, "1691352528", {amount: 20}));
StarlingCoin.addBlock(new Block (2, "1691352542", {amount: 50}));
StarlingCoin.addBlock(new Block (3, "1691352550", {amount: 80}));


console.log(StarlingCoin.chain)
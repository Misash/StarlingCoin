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
        x = sha256(x).toString();
        return x;
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
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            //check hash
            if( currentBlock.hash !== currentBlock.calculateHash()){
                
                console.log("hash", currentBlock.hash," - " ,currentBlock.calculateHash()," - " , currentBlock.calculateHash())
                return false;
            }
            //check prevhash
            if( currentBlock.previousHash !== prevBlock.hash){
                console.log("prevhash",currentBlock)
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

// StarlingCoin.addBlock(new Block (1, "01/01/2018", {amount: 20}));
// StarlingCoin.addBlock(new Block (2, "01/01/2018", {amount: 50}));
// StarlingCoin.addBlock(new Block (3, "01/01/2018", {amount: 80}));


// console.log(StarlingCoin.chain)

console.log("Chain valid: ", StarlingCoin.isChainValid());

//attempting hack block
StarlingCoin.chain[1].data = { amount: 100000};
StarlingCoin.chain[1].hash = StarlingCoin.chain[1].calculateHash();


console.log("Chain valid: ", StarlingCoin.isChainValid());



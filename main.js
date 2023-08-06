//StarlingCoin by Misash

const sha256 = require('crypto-js/sha256')
const chalk = require('chalk');

const startlingLogo = `
          __                 __  .__  .__                
  _______/  |______ ________/  |_|  | |__| ____    ____  
 /  ___/\   __\__  \\_  __ \   __\  | |  |/    \  / ___\ 
 \___ \  |  |  / __ \|  | \/|  | |  |_|  |   |  \/ /_/  >
/____  > |__| (____  /__|   |__| |____/__|___|  /\___  / 
     \/            \/                         \//_____/ 
`;

class Block{

    constructor(index,timestamp,data,previousHash=''){

        this.index = index
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        //pre-defined nonce
        this.nonce = 0;

        this.hash = this.calculateHash();
    }

    calculateHash(){
        let x = this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce;
        x = sha256(x).toString();
        return x;
    }

    mineBlock(difficulty){

        // loop while hash not start with zeros of difficulty length
        while(this.hash.substring(0,difficulty) !== "0".repeat(difficulty)){

            //increment nonce
            this.nonce++;

            //recalculate hash
            this.hash = this.calculateHash();
        }

        console.log("Block mined! ", this.hash);
    }

}


class Blockchain{

    constructor(difficulty){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = difficulty;
        console.log(chalk.cyan(startlingLogo));
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
        // newBlock.hash = newBlock.calculateHash();

        //try get the hash difficulty
        newBlock.mineBlock(this.difficulty);

        this.chain.push(newBlock);
    }

    isChainValid(){
        for(let i = 1; i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const prevBlock = this.chain[i-1];

            //check hash
            if( currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }
            //check prevhash
            if( currentBlock.previousHash !== prevBlock.hash){
                return false;
            }
        }

        return true;
    }

}


//create blockchain
let StarlingCoin = new Blockchain(4)


//adding blocks to the blockchain
console.time('Mining block 1');
StarlingCoin.addBlock(new Block (1, "1691352528", {amount: 20}));
console.timeEnd('Mining block 1');


console.time("Mining block 2")
StarlingCoin.addBlock(new Block (2, "1691352542", {amount: 50}));
console.timeEnd('Mining block 2');

console.time("Mining block 3")
StarlingCoin.addBlock(new Block (3, "1691352550", {amount: 80}));
console.timeEnd("Mining block 3")

// console.log(StarlingCoin.chain)

console.log("Chain valid?: ", StarlingCoin.isChainValid());


//attempting hack block
StarlingCoin.chain[1].data = { amount: 100000};
StarlingCoin.chain[1].hash = StarlingCoin.chain[1].calculateHash();

console.log("Chain valid: ", StarlingCoin.isChainValid());



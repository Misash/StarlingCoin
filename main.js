//StarlingCoin by Misash

class Block{
    constructor(index,timestamp,data,previousHash){

        this.index = index
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;

        this.hash = "";
    }

    calculateHash(){
        
    }

}


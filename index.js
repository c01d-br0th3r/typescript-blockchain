"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CrpytoJS = require("crypto-js");
var Block = /** @class */ (function () {
    function Block(index, hash, previosHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previosHash;
        this.data = data;
        this.timestamp = timestamp;
    }
    Block.calcBlockHash = function (index, previousHash, timestamp, data) {
        return CrpytoJS.SHA256(index + previousHash + timestamp + data).toString();
    };
    Block.validateStructure = function (aBlock) {
        return typeof aBlock.index === "number" &&
            typeof aBlock.hash === "string" &&
            typeof aBlock.previousHash === "string" &&
            typeof aBlock.timestamp === "number" &&
            typeof aBlock.data === "string";
    };
    return Block;
}());
var genesisBlock = new Block(0, "1234", "", "Hello", 123456);
var blockChain = [genesisBlock];
console.log(blockChain);
var getBlockChain = function () { return blockChain; };
var getLatestBlock = function () { return blockChain[blockChain.length - 1]; };
var getNewTImeStamp = function () { return Math.round(new Date().getTime() / 1000); };
var createNewBlock = function (data) {
    var previosBlock = getLatestBlock();
    var newIndex = previosBlock.index + 1;
    var newTimeStamp = getNewTImeStamp();
    var newHash = Block.calcBlockHash(newIndex, previosBlock.hash, newTimeStamp, data);
    var newBlock = new Block(newIndex, newHash, previosBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
var getHashforBlock = function (aBlock) {
    return Block.calcBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
};
var isBlockValid = function (candidateBlock, previousBlock) {
    if (!Block.validateStructure(candidateBlock))
        return false;
    else if (previousBlock.index + 1 !== candidateBlock.index)
        return false;
    else if (previousBlock.hash !== candidateBlock.previousHash)
        return false;
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash)
        return false;
    else
        return true;
};
var addBlock = function (candidateBlock) {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("second block");
createNewBlock("third block");
createNewBlock("forth block");
console.log(blockChain);
//# sourceMappingURL=index.js.map
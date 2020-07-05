import * as CrpytoJS from "crypto-js";

class Block {
  public index: number;
  public hash: string;
  public previousHash: string;
  public data: string;
  public timestamp: number;

  static calcBlockHash = (
    index: number,
    previousHash: string,
    timestamp: number,
    data: string
  ): string =>
    CrpytoJS.SHA256(index + previousHash + timestamp + data).toString();

  static validateStructure = (aBlock: Block): boolean =>
    typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number" &&
    typeof aBlock.data === "string";

  constructor(
    index: number,
    hash: string,
    previosHash: string,
    data: string,
    timestamp: number
  ) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previosHash;
    this.data = data;
    this.timestamp = timestamp;
  }
}

const genesisBlock: Block = new Block(0, "1234", "", "Hello", 123456);
let blockChain: Block[] = [genesisBlock];
console.log(blockChain);

const getBlockChain = (): Block[] => blockChain;
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];
const getNewTImeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
  const previosBlock: Block = getLatestBlock();
  const newIndex: number = previosBlock.index + 1;
  const newTimeStamp: number = getNewTImeStamp();
  const newHash: string = Block.calcBlockHash(
    newIndex,
    previosBlock.hash,
    newTimeStamp,
    data
  );
  const newBlock: Block = new Block(
    newIndex,
    newHash,
    previosBlock.hash,
    data,
    newTimeStamp
  );
  addBlock(newBlock);
  return newBlock;
};

const getHashforBlock = (aBlock: Block): string =>
  Block.calcBlockHash(
    aBlock.index,
    aBlock.previousHash,
    aBlock.timestamp,
    aBlock.data
  );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
  if (!Block.validateStructure(candidateBlock)) return false;
  else if (previousBlock.index + 1 !== candidateBlock.index) return false;
  else if (previousBlock.hash !== candidateBlock.previousHash) return false;
  else if (getHashforBlock(candidateBlock) !== candidateBlock.hash)
    return false;
  else return true;
};

const addBlock = (candidateBlock: Block): void => {
  if (isBlockValid(candidateBlock, getLatestBlock())) {
    blockChain.push(candidateBlock);
  }
};

createNewBlock("second block");
createNewBlock("third block");
createNewBlock("forth block");
console.log(blockChain);
export {};

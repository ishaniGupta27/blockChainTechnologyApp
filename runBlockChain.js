var bcModule= require('./blockChainModule.js');

bcModule.startBlockChain();
bcModule.createBlock("This is the second Block");
bcModule.createBlock("This is the third Block");

console.log(bcModule.showBlockChain());
//Funda ye hai ki humme pichla hash layenge and usse hash +data+ timeTSamp+ constraint karke naye walle blaok ka hash banayenge
var crypto=require('crypto');
var blockChain=[];
exports.createBlock= function(data){
    var Data=data;
    var timeStamp=Date();
    var prevHash=fetchPrevHash(blockChain);
    var index=blockChain.length;
    createHashForBlockToAddToChain(Data,timeStamp,prevHash,index);
};

exports.startBlockChain= function(){
    var Data="Let us start it!";
    var timeStamp= Date();
    var prevHash=0;
    var index=0;
    createHashForBlockToAddToChain(Data,timeStamp,prevHash,index);
}

function fetchPrevHash(blockChain){
	return blockChain.slice(-1).pop();
}
function createHashForBlockToAddToChain(data,timeStamp,prevHash,index){
/*----------------------------ALL About Hashing----------------------------
What is the library to use for hashing?
md5
sh1
A good checksum algorithm will produce the same value on the same input, and different values on different input. 
And, it will produce the same value on the same input on any computer.
A checksum collision is always possible no matter how good the checksum algorithm is.
This is because a checksum has to take a file of some arbitrary size and reduce it to a number
------------------------------------------------------------------------------------------------------------*/

//Handling difficulty in hashing i.e. not all hash created are accepted!
    var hash='';
    var handHash=0;//This is where th "Proof of work lies"
    //the miners provide handHash(nounce) to make sure the hash is below a thresold(difficulty)

    //This finding the nounce(handHash) is a brute force method to make it rare and unique.
    //this is to ensure consensus is reached on basis of ppl solving the concensus.

    //VMWare defined different models under Nankamoto Consensus
    //1. Thresold Adversary Model:: Consensus from other parties. If you have majority !! Go ahead ..you have the stage for adding in the chain
    //2. Computational Adversary Model: Consenus on just giving power to one who has maximum computational power to add to blockchain. Is it enviroment haelthy?
    //I do not think so--one bitcoin takes energy of more tha 1 home for a day.
    //3. Stake Thresold Adversary: Deterministic way--not by chance i.e. who reaches a nounce whenever...(brute force). One having more stake has power to commit there transaction.
         //Casper: Ethereum----> all validators(no limit --anyone can be validator) put a bet(stake) on whichever block they think can win
         //For voting they use there last references---"Prepare"---> last prepare and last commit :::::: "Commit"--> last prepare
        // Rules of the game::

           //commit--> 2/3 prepare hone chahiye
           //2/3 prepare ke liye--> 2/3 voters shud refer to same previous reference/block for prepare and commit(shud be same).
           //[Ek block ke liye voting hogi]--wo block jeetega jiske 2/3 voters ke lastest block same hoga ! ##Awesome idea.
           //one validator--> one vote for any one of block for one position


    while(!validateHash(hash)){//Till the time the hash is not a validated hash.
        var totData=data+timeStamp+prevHash+index+handHash;
        hash=crypto.createHash('md5').update(totData).digest('hex');
        handHash++;
    }

    blockChain.push(hash);

}


function validateHash(hash){
/*----------------------------BlockChain Difficulty----------------------------
This is what miners do. They find a validated hashmap for any trasaction and hence charge fee for that.It is
a tough job to get a validated hashmap when the blockchain is huge.
Valid blocks must have a hash below this target : Difficulty level.
Now here in this application I am keeping it simple
------------------------------------------------------------------------------------------------------------*/
    return hash.startsWith('1111');


}

exports.showBlockChain= function(){

    return blockChain;


}
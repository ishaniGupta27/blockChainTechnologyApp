//Funda ye hai ki humme pichla hash layenge and usse hash +data+ timeTSamp+ constraint karke naye walle blaok ka hash banayenge
var crypto=require('crypto');
var blockChain=[];
exports.createBlock= function(data){
    

};


function startBlockChain(){
    var Data="Let us start it!";
    var timeStamp= Date();
    var prevHash=0;
    var index=0;
    createHashForBlockToAddToChain(Data,timeStamp,prevHash,index);
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
    var handHash=0;
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
------------------------------------------------------------------------------------------------------------*/
    return hash.startWith('1111');


}
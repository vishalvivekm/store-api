const paragraph = "I think Ruth's dog is cuter than your dog!";

console.log(paragraph.replace("Ruth's", 'my'));
// Expected output: "I think my dog is cuter than your dog!"

const regex = /Dog/ig;
console.log(paragraph.replace(regex, (match) => `${match}-hi`)); // match, if any , can be passed as args to the second function
// Expected output: "I think Ruth's dog-hi is cuter than your dog-hi!"


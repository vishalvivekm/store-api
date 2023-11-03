// What happens if we don't specify the second argument; the encoding type

const fs = require('fs'); // for security ('node:fs')
const filePath = './content/subfolder/first.txt';

// Without specifying an encoding, a Buffer is returned
const bufferContent = fs.readFileSync(filePath);

console.log(bufferContent); // <Buffer ...> // <Buffer 48 65 6c 6c 6f 2c 20 54 68 69 73 20 69 73 20 66 69 72 73 74 20 74 65 78 74 20 66 69 6c 65>


// If you specify an encoding, it returns a string
const stringContent = fs.readFileSync(filePath, 'utf8');

console.log(stringContent[1]); // 'Contents of the file as a string...'


// CallBack Api; asynchronous Api

// const fs = require('fs');
//
// const data = fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) throw err;
//     console.log(data.split('')[1]) // returns e
// });


// Question: Choose the correct statements about synchronous and asynchronous APIs when using the fs module.
// Ans: Asynchronous read functions allow us not to wait for the file to be read in order to execute the subsequent code.
// We can use synchronous and asynchronous operations when using the fs module.
const path = require('path');

console.log(path.sep); // path separator in linux it's /, in windows it's \

const filePath = path.join('/content', 'subfolder', 'test.txt'); // if put '/console/' it'll remove the 2nd / and still print /content/subfolder/test.txt// and not /content//subfolder/test.txt
console.log(filePath); //  /content/subfolder/test.txt

const base = path.basename(filePath) // returns test.txt ( file-name with extension)
console.log(base) //test.txt

const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt')
console.log(absolute) // the full absolute path
//console.log(__dirname) // globals, it points to current file's location ( absolute location)

// module: path
// methods learnt: join(), basename(), resolve(),
// property: sep ( separator property)
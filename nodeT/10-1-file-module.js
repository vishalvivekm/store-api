// Keep in mind that synchronous file operations should be used with caution, especially in a server environment,
// as they can block the event loop and slow down your application. In most cases, it's recommended to use
// the asynchronous versions of these functions (e.g., readFile and writeFile) to avoid blocking the main thread.

//const file = require('node:fs') // there are two flavour: async ( non-blocking) and synchronous ( blocking) one

const {readFileSync, writeFileSync }= require('fs')

const firstFilePath = './content/subfolder/first.txt'
const secondFilePath = './content/subfolder/second.txt'

const dataRead = readFileSync(firstFilePath, 'utf8');
console.log(dataRead);






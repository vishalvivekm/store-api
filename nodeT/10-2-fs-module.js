const {writeFile, appendFile, writeFileSync} = require('fs');
// fs.writeFile(file, data, [ options], callback)
// fs.writeFileSync(file, data)
// fs.appendFile(file, data, callBack)

const header = '<h1>This is primary level header</h1>';
const subHeader = '<h2> This is secondary header</h2>';
const fileName = 'index.html'

// writeFile(fileName, header, (err) => {
//     if (err) throw err;
//     console.log(`${fileName} generated!`)
// })
appendFile(fileName, subHeader, (err) => {
    if (err) console.log("There's some error")
    console.log("Successfully appended to the file")
})
// appendFileSync(path, data)

// \n or \r\n for windows

// writeFileSync(fileName, header); // Synchronous method

// In real-world applications, asynchronous methods are more common and preferable
// because they do not block the event loop.


// Event loop
function func() {
    console.log("Hello");
}

Promise.resolve()
    .then((msg)=> console.log("hdklfdkl"));
setTimeout(func, null);
console.log("Welcome")
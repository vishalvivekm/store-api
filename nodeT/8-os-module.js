const os = require('os') // built-in module example: os-module

// info about current user
const user = os.userInfo()
console.log(user)

// method returns system uptime in seconds
console.log(`The System uptime is: ${os.uptime()} seconds`);

const currentOS = {
    name:os.type(),
    release:os.release(),
    totalMem:os.totalmem(),
    freeMem: os.freemem(),
}
console.log(currentOS);

// Learnings:
// build-in module: os
// methods: type(), release(), totalmem(), totalmem(), freemem(), uptime(), userInfo(),
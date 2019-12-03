const fs = require('fs')

const input = fs.readFileSync('day01input.txt', { encoding: 'utf8' }).split('\n')

let p1 = input.reduce((accum, x) => {
    return accum + Math.floor(parseInt(x, 10) / 3) - 2
}, 0)

console.log(`${p1}`)

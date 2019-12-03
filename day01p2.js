const fs = require('fs')

const input = fs.readFileSync('day01input.txt', { encoding: 'utf8' }).split('\n')

let p2 = input.reduce((accum, x) => {
    let v = 0

    for (let q = parseInt(x, 10); q >= 0;) {
        q = Math.floor(q / 3) - 2
        v += Math.max(q, 0)
    }

    return accum + v
}, 0)

console.log(`${p2}`)
